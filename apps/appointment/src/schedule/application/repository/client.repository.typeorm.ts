import { InjectRepository } from '@nestjs/typeorm';
import { IClientRepository } from '../../domain/repository/client.repository.interface';
import { Injectable } from '@nestjs/common';
import { ClientModel } from '../model/client.model';
import { Repository } from 'typeorm';
import { clientTypeOrmToEntity } from '../gateway/client-typeorm-to-entity';
import { ClientEntity } from '../../domain/entity/client/client.entity';

@Injectable()
export class ClientRepositoryTypeORM implements IClientRepository {
  constructor(
    @InjectRepository(ClientModel)
    private readonly clientModel: Repository<ClientModel>,
  ) {}

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findOne({
      where: {
        id,
      },
    });

    if (!client) return null;

    return clientTypeOrmToEntity(client);
  }
}
