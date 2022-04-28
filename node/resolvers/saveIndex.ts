import { EXTENDED_INDEX_FILE, getBucket, hashString } from '../utils'
import {
  currentDate,
  SitemapIndex,
} from './../middlewares/generateMiddlewares/utils'
import { getDefaultStoreBinding } from './../resources/bindings'

export const saveIndex = async (
  _: {},
  { index, binding }: { index: string; binding?: string },
  ctx: Context
) => {
  const {
    clients: { vbase },
  } = ctx
  let success = false
  if (!binding) {
    binding = await getDefaultStoreBinding(ctx)
  }
  const bucket = getBucket('', hashString(binding))
  const { index: extendedIndexes } = (await vbase.getJSON<SitemapIndex>(
    bucket,
    EXTENDED_INDEX_FILE,
    true
  )) || { index: [] }
  // check if index is already in the extendedIndexes
  if (extendedIndexes.includes(index)) {
    success = true
    return success
  }
  extendedIndexes.push(index)
  await vbase
    .saveJSON(bucket, EXTENDED_INDEX_FILE, {
      index: extendedIndexes,
      lastUpdated: currentDate(),
    })
    .then(() => {
      success = true
    })
    .catch(() => null)
  return success
}
