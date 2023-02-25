import { Product } from "./product";

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    
    expect(() => {
      new Product("", "Product 1", 100)
    }).toThrowError('product: Id is required');
  })

  it('should throw error when name is empty', () => {
    
    expect(() => {
      new Product("123", "", 100)
    }).toThrowError('product: Name is required');
  })

  it('should throw error when price is less than zero', () => {
    
    expect(() => {
      new Product("123", "Name", -1)
    }).toThrowError('product: Price must be greater than zero');
  })

  it('should change name', () => {
      const product = new Product("123", "Name", 100)
      product.changeName( "New Name");
      expect(product.name).toBe("New Name")
  })

  it('should change price', () => {
      const product = new Product("123", "Name", 100)
      product.changePrice(200);
      expect(product.price).toBe(200)
  })

  it('should throw when name and ID are empty', () => {
    expect(() => {
      new Product("", "", -1)
    }).toThrowError('product: Id is required,product: Name is required');
  })

});