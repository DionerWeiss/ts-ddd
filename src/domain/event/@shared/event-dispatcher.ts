import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  public register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }
  
  public unregister(eventName: string, eventHandler: EventHandlerInterface): void {
  }

  public unregisterAll(): void {
  }

  public notify(event: EventInterface): void {
  }
}