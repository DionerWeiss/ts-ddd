import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.city,
        number: customer.Address.number,
        street: customer.Address.street,
        zip: customer.Address.zip

      }
    }
  }
}