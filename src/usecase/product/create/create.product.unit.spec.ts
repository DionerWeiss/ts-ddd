import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  type: "a",
  name: 'Product 1',
  price: 12.90
  
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create product use case', () => {
  it('create a product of tye "a"', async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)

    const output = await usecase.execute(input)

    expect(output).toEqual( {
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  });

  it('create a product of tye "b"', async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)

    const output = await usecase.execute({type: "b", name: input.name, price: input.price})

    expect(output).toEqual( {
      id: expect.any(String),
      name: input.name,
      price: input.price * 2
    })
  });

  it('should thrown an error if product type is invalid"', async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)

    const promise = usecase.execute({type: "c", name: input.name, price: input.price})

    await expect(promise).rejects.toThrow("Invalid product type")
  });

});