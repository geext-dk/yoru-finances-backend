import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../src/app.module'
import { ReceiptModel } from '../../src/receipts/dtos/receipt.model'
import { ReceiptProductModel } from '../../src/receipts/dtos/receiptProduct.model'
import { ReceiptsService } from '../../src/receipts/receipts.service'

describe('Receipts', () => {
  let app: INestApplication

  const mockResponse: ReceiptModel = {
    id: 'ReceiptId',
    account: 'Account',
    date: new Date(Date.UTC(2023, 0, 1, 0, 0, 0, 0)),
    store: 'Store',
    products: [
      {
        id: 'ReceiptProductId',
        name: 'Product',
        category: 'Category',
        quantity: 1,
        pricePerUnit: 1,
        totalPrice: 1,
      },
    ],
  }

  const receiptsService = {
    async findById(_id: string): Promise<ReceiptModel | undefined> {
      return undefined
    },
    async getReceiptProducts(
      _receiptId: string,
    ): Promise<ReceiptProductModel[]> {
      return []
    },
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ReceiptsService)
      .useValue(receiptsService)
      .compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it(`query a receipt by id`, () => {
    receiptsService.findById = async () => mockResponse

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ receipt(id:"8009feae-869a-43e4-b089-e7c5442dd295") { id account store date } }`,
      })
      .expect(200)
      .expect({
        data: {
          receipt: {
            id: 'ReceiptId',
            account: 'Account',
            date: '2023-01-01T00:00:00.000Z',
            store: 'Store',
          },
        },
      })
  })

  it(`query a receipt by id with products`, () => {
    receiptsService.findById = async () => mockResponse
    receiptsService.getReceiptProducts = async () => mockResponse.products

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ receipt(id:"8009feae-869a-43e4-b089-e7c5442dd295") { id account store date
              products { id name category pricePerUnit quantity totalPrice }
            } }`,
      })
      .expect(200)
      .expect({
        data: {
          receipt: {
            id: 'ReceiptId',
            account: 'Account',
            date: '2023-01-01T00:00:00.000Z',
            store: 'Store',
            products: [
              {
                id: 'ReceiptProductId',
                name: 'Product',
                category: 'Category',
                quantity: 1,
                pricePerUnit: 1,
                totalPrice: 1,
              },
            ],
          },
        },
      })
  })

  it(`query a receipt but it doesnt exist`, () => {
    receiptsService.findById = async () => undefined

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ receipt(id:"8009feae-869a-43e4-b089-e7c5442dd295") { id } }`,
      })
      .expect(200)
      .expect({
        data: {
          receipt: null,
        },
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
