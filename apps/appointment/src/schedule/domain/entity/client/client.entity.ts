import { ClassProperties } from 'apps/appointment/shared/types/class-properties.type';

export class ClientEntity {
  private readonly id: string;
  private readonly name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  toJSON(): ClassProperties<ClientEntity> {
    return structuredClone(this);
  }
}
