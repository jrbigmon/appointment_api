export class ClientEntity {
  private readonly _id: string;
  private readonly _name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this._id = id;
    this._name = name;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }
}
