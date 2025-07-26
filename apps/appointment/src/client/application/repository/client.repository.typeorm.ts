import { FindOptionsOrder, Not, Repository } from 'typeorm';
import { ClientEntity } from '../../domain/entity/client.entity';
import { IClientRepository } from '../../domain/repository/client-repository.interface';
import { ClientModel } from '../model/client.model';
import { InjectRepository } from '@nestjs/typeorm';
import { clientTypeOrmToEntity } from '../gateway/client-typeorm-to-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepositoryTypeORM implements IClientRepository {
  private readonly defaultTake = 20;
  private readonly defaultSkip = 0;
  private readonly defaultOrder = [['createdAt', 'DESC']];

  constructor(
    @InjectRepository(ClientModel)
    private readonly clientModel: Repository<ClientModel>,
  ) {}

  async save(item: ClientEntity): Promise<void> {
    await this.clientModel.save(item);
  }

  async delete(id: string): Promise<void> {
    await this.clientModel.softDelete(id);
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findOne({
      where: {
        id,
      },
    });

    return clientTypeOrmToEntity(client);
  }

  async findAll(options: {
    take?: number;
    skip?: number;
    order?: string[][];
  }): Promise<ClientEntity[]> {
    const {
      skip = this.defaultSkip,
      take = this.defaultTake,
      order = this.defaultOrder,
    } = options;

    const result = await this.clientModel.find({
      skip,
      take,
      order: order as FindOptionsOrder<ClientModel>,
    });

    return result.map((item) => clientTypeOrmToEntity(item));
  }

  async findOneByOr(options: {
    or: { email?: string; cpf?: string; phone?: string; rg?: string };
    ignoreId?: string;
  }): Promise<ClientEntity | null> {
    const operatorOr = [];

    Object.entries(options.or).forEach(([key, value]) => {
      const or: object = {
        [key]: value,
      };

      if (options.ignoreId) {
        or['id'] = Not(options.ignoreId);
      }

      operatorOr.push(or);
    });

    const client = await this.clientModel.findOne({
      where: operatorOr,
    });

    if (!client) return null;

    return clientTypeOrmToEntity(client);
  }
}
