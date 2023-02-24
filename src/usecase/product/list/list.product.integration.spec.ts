import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "./list.product.usecase";

describe('List Products UseCase Integration Test', () => {
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
    const usecase = new ListProductsUseCase(productRepository)

    const product1 = new Product("123", "Product 1", 1)
    const product2 = new Product("456", "Product 2", 2)
    
    await productRepository.create(product1)
    await productRepository.create(product2)


    const result = await usecase.execute({})

    const output = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price
        }
      ]
    }

    expect(result).toEqual(output)

  })


});