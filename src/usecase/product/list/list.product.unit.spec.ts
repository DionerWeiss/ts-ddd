import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ListProductsUseCase } from "./list.product.usecase";

const product1 = ProductFactory.create("a", "product 1", 12)
const product2 = ProductFactory.create("b", "product 2", 1)


const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),

  }
}

describe("Unit test for listing products use case", () => {
  it('should list all products', async () => {
    const propductRepository = MockRepository()
    const useCase = new ListProductsUseCase(propductRepository)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  });
})