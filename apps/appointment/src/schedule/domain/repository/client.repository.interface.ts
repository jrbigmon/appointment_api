import { ClientEntity } from '../entity/client/client.entity';
import { IRepository } from 'apps/appointment/shared/repository/repository.interface';

export interface IClientRepository
  extends Pick<IRepository<ClientEntity>, 'findById'> {}
