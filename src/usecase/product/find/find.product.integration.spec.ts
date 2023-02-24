import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe('Find Product UseCase Integration Test', () => {
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

  it('should find a product ', async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository)

    const product = new Product("123", "Product", 112)
    
    await productRepository.create(product)

    const input = {
      id: product.id,
    }

    const result = await usecase.execute(input)

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    expect(result).toEqual(output)

  })


});