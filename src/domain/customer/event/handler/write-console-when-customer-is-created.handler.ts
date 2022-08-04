import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { AddressChangedEvent } from "../address-changed.event";
import { CustomerCreatedEvent } from "../customer-created.event";

export class WriteConsoleWhenAddressIsChanged implements EventHandlerInterface<CustomerCreatedEvent> {

  handle(event: AddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} altarado para ${JSON.stringify(event.eventData.address)}`);
  }
}