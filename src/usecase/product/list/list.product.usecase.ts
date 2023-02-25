import { ProductInterface } from "../../../domain/product/entity/produc.interface";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto, OutputListProductsDto } from "./list.product.dto";

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput(products: ProductInterface[]): OutputListProductsDto {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}