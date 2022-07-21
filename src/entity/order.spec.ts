import { Order } from "./order";
import { OrderItem } from "./order-item";

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    
    expect(() => {
      new Order
      ('', '', []);
    }).toThrowError('Id is required');
  })

  it('should throw error when customerId is empty', () => {
    
    expect(() => {
      new Order
      ('123', '', []);
    }).toThrowError('Id is required');
  })

  it('should throw error when item is empty', () => {
    
    expect(() => {
      new Order
      ('123', '123', []);
    }).toThrowError('Items are required');
  })

  it('should calculate total', () => {
    const item = new OrderItem('123', 'Item 1', 100, '123', 1);
    const item2 = new OrderItem('123', 'Item 2', 200, '123', 1);
    const order = new Order('o1', 'c1', [item]);

    let total = order.total();

    expect(total).toBe(100);

    const order2 = new Order('o1', 'c1', [item, item2]);

    total = order2.total();

    expect(total).toBe(300);
  })

  it('should throw error if the item quantity is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0)
      const order = new Order("o1", "c1", [item])
    }).toThrowError("Item quantity must be greater than 0")

  })

});