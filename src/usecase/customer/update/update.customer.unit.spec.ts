import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";


describe("Unit test for customer update use case", () => {
  let customer: Customer
  let MockRepository: () => CustomerRepositoryInterface

  beforeEach(() => {
     customer = CustomerFactory.createWithAddress('John', new Address("Street", 123, "Zip", "City"))

      MockRepository = () => ({
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue(customer),
        update: jest.fn()
    })
  })
  
 
  it("should updated a customer", async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const input = {
      id: customer.id,
      name: "John Updated",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
      }
    }
    
    
    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })

  it('thrown an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    const input = {
      id: customer.id,
      name: "",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
      }
    }

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("customer: Name is required")

  });

  it('thrown an error when street is missing', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const input = {
      id: customer.id,
      name: "John Updated",
      address: {
        street: "",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
      }
    }


    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required")

  });
})