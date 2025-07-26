import { Inject, Injectable } from '@nestjs/common';
import {
  ClientInterface,
  IClientFacadeService,
} from './client.facade.service.interface';
import { IClientRepository } from '../../domain/repository/client-repository.interface';

@Injectable()
export class ClientFacadeService implements IClientFacadeService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async findById(id: string): Promise<ClientInterface | null> {
    const client = await this.clientRepository.findById(id);

    if (!client) return null;

    const { name, email, phone } = client;

    return {
      id,
      name,
      email,
      phone,
    };
  }
}
