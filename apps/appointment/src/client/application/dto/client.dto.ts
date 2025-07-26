import { ClientEntity } from '../../domain/entity/client.entity';

export class ClientDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;
  active: boolean;

  constructor(clientEntity: ClientEntity) {
    const { id, name, email, phone, rg, cpf, active } = clientEntity;

    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.rg = rg;
    this.cpf = cpf;
    this.active = active;
  }
}
