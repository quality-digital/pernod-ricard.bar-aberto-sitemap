import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export interface GetProductsAndSkuIdsReponse {
  items: number[]
  paging: {
    total: number
    page: number
    perPage: number
    pages: number
  }
}

const PAGE_SIZE = 5000

export class Catalog extends ExternalClient {
  constructor(protected context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'Content-Type': 'application/json',
          'VtexIdclientAutCookie': context.authToken,
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public getProductsIds (page: number): Promise<GetProductsAndSkuIdsReponse> {
    return this.http.get('/api/catalog_system/pvt/products/GetProductsIds', {
      params: {
        Page: page,
        pageSize: PAGE_SIZE,
      },
    })
  }
}
