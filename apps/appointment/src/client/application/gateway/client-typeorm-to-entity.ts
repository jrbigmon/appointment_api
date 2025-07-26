import { ClientEntity } from '../../domain/entity/client.entity';
import { ClientModel } from '../model/client.model';

export function clientTypeOrmToEntity(client: ClientModel): ClientEntity {
  return new ClientEntity(client);
}
