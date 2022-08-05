import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');
    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.Address).toBeUndefined();
    expect(customer.constructor.name).toBe('Customer');
  })

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 1, '12345', 'City');
    const customer = CustomerFactory.createWithAddress('John Doe', address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.Address).toEqual(address);
  })
})