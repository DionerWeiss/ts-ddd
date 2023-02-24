import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

describe('Create Product UseCase Integration Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product ', async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      type: "a",
      name: 'Product 1',
      price: 12.90
    }

    const result = await usecase.execute(input)

    const productCreated = await productRepository.find(result.id)

    const output = {
      id: productCreated.id,
      name: productCreated.name,
      price: productCreated.price
    }

    expect(result).toEqual(output)

  })


});