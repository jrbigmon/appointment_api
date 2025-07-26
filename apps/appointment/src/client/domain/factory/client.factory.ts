import { ClientEntity } from '../entity/client.entity';
import { ValidateBrazilianClient } from '../entity/functions/validate-client';
import { randomUUID } from 'node:crypto';

type CreateClientInput = {
  name: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;
  active: boolean;
};

type UpdateClientInput = Partial<CreateClientInput>;

export class ClientFactory {
  public static create(input: CreateClientInput): ClientEntity {
    const { name, email, phone, rg, cpf, active } = input;

    const client = new ClientEntity({
      id: randomUUID(),
      name,
      email,
      phone,
      rg,
      cpf,
      active,
    });

    ValidateBrazilianClient.execute(client);

    return client;
  }

  public static update(input: UpdateClientInput, client: ClientEntity): void {
    const { name, email, phone, rg, cpf, active } = input;

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.rg = rg;
    client.cpf = cpf;
    client.active = active;

    ValidateBrazilianClient.execute(client);
  }
}
