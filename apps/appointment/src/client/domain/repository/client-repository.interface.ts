import { ClientEntity } from '../entity/client.entity';
import { IRepository } from 'apps/appointment/shared/repository/repository.interface';

export interface IClientRepository extends IRepository<ClientEntity> {
  findAll(options: {
    take?: number;
    skip?: number;
    order?: string[][];
  }): Promise<ClientEntity[]>;

  findOneByOr(options: {
    or: {
      email?: string;
      cpf?: string;
      phone?: string;
      rg?: string;
    };
    ignoreId?: string;
  }): Promise<ClientEntity | null>;
}
