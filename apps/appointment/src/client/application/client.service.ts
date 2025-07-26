import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';

import { ClientDto } from './dto/client.dto';
import { ClientEntity } from '../domain/entity/client.entity';
import { ClientFactory } from '../domain/factory/client.factory';
import { CreateClientInput } from './types/create-client.type';
import { IClientRepository } from '../domain/repository/client-repository.interface';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async create(input: CreateClientInput): Promise<ClientDto> {
    try {
      const client = ClientFactory.create(input);

      await this.checkIfAlreadyExistsClient(client);

      await this.clientRepository.save(client);

      return new ClientDto(client);
    } catch (error) {
      this.logger.error(`[create]: ${error.message}`);
      throw error;
    }
  }

  private async checkIfAlreadyExistsClient(client: ClientEntity) {
    const clientAlreadyExists = await this.clientRepository.findOneByOr({
      or: {
        email: client.email,
        phone: client.phone,
        rg: client.rg,
        cpf: client.cpf,
      },
      ignoreId: client.id,
    });

    if (!clientAlreadyExists) return;

    if (clientAlreadyExists.email === client.email) {
      throw new ConflictException('Email already registered');
    }

    if (clientAlreadyExists.phone === client.phone) {
      throw new ConflictException('Phone already registered');
    }

    if (clientAlreadyExists.rg === client.rg) {
      throw new ConflictException('RG already registered');
    }

    if (clientAlreadyExists.cpf === client.cpf) {
      throw new ConflictException('CPF already registered');
    }
  }
}
