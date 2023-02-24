import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";


const product = ProductFactory.create("a", "product 1", 12)

const input = {
  id: product.id,
  name: 'Product 1',
  price: 12.90
}


const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Update Product UseCase Unit Test', () => {
  it('update a product', async () => {
    const repository = MockRepository()
    const usecase = new UpdateProductUseCase(repository)

    const output = await usecase.execute(input)

    expect(output).toEqual( {
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  });


});