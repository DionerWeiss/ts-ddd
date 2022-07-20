import Address from "../value-object/address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    } else if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  set Address(address: Address) {
    this._address = address;
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

  isActive() {
    return this._active;
  }
}