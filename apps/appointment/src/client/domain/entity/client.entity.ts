export class ClientEntity {
  private _id: string;
  private _name: string;
  private _email: string;
  private _phone: string;
  private _rg: string;
  private _cpf: string;
  private _active: boolean;

  constructor({
    id,
    name,
    email,
    phone,
    rg,
    cpf,
    active,
  }: {
    id: string;
    name: string;
    email: string;
    phone: string;
    rg: string;
    cpf: string;
    active: boolean;
  }) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._rg = rg;
    this._cpf = cpf;
    this._active = active;
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

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter phone
   * @return {string}
   */
  public get phone(): string {
    return this._phone;
  }

  /**
   * Getter rg
   * @return {string}
   */
  public get rg(): string {
    return this._rg;
  }

  /**
   * Getter cpf
   * @return {string}
   */
  public get cpf(): string {
    return this._cpf;
  }

  /**
   * Getter active
   * @return {boolean}
   */
  public get active(): boolean {
    return this._active;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    if (value) this._id = value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    if (value) this._name = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    if (value) this._email = value;
  }

  /**
   * Setter phone
   * @param {string} value
   */
  public set phone(value: string) {
    if (value) this._phone = value;
  }

  /**
   * Setter rg
   * @param {string} value
   */
  public set rg(value: string) {
    if (value) this._rg = value;
  }

  /**
   * Setter cpf
   * @param {string} value
   */
  public set cpf(value: string) {
    if (value) this._cpf = value;
  }

  /**
   * Setter active
   * @param {boolean} value
   */
  public set active(value: boolean) {
    if (value) this._active = value;
  }
}
