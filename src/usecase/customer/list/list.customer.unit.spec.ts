import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"))

const customer2 = CustomerFactory.createWithAddress("Jane", new Address("street", 456, "zip 2", "city 2"))

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),

  }
}

describe("Unit test for listing customer use case", () => {
  it('should list a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new ListCustomerUseCase(customerRepository)

    const output = await useCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.Address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.Address.street)
  });
})