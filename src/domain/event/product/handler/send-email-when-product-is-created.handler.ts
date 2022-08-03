import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {

  async handle(event: ProductCreatedEvent): Promise<void> {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}