import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

export type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export class OrderFactory {
  static create({id, customerId, items}: OrderFactoryProps): Order {
    const orderItems = items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
    return new Order(id, customerId, orderItems);
  }
}