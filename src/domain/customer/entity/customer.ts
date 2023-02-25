import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { Address } from "../value-object/address";

export class Customer extends Entity{
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  set Address(address: Address) {
    this._address = address;
  }

  get Address(): Address {
    return this._address;
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({message: 'Id is required', context: "customer"})
    }
    if (this._name.length === 0) {
      this.notification.addError({message: 'Name is required', context: "customer"})
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if(this._address === undefined) {
      throw new Error('Address is mandatory to activate customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

}