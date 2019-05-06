const TEN_MINUTES_S = 10 * 60

export const robots = async (ctx: Context) => {
  const {vtex: {account, production}} = ctx
  const {clients: {robots: robotsDataSource}} = ctx
  const data = await robotsDataSource.fromLegacy(account)
  ctx.set('Content-Type', 'text/plain')
  ctx.body = data
  ctx.status = 200
  ctx.set('cache-control', production ? `public, max-age=${TEN_MINUTES_S}`: 'no-cache')
}
