import { ClientController } from './client.controller';
import { ClientFacadeService } from './facade/client.facade.service';
import { ClientModel } from './model/client.model';
import { ClientRepositoryTypeORM } from './repository/client.repository.typeorm';
import { ClientService } from './client.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel])],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepositoryTypeORM,
    ClientFacadeService,
    {
      provide: 'ClientRepository',
      useClass: ClientRepositoryTypeORM,
    },
    {
      provide: 'ClientFacadeService',
      useClass: ClientFacadeService,
    },
  ],
  exports: ['ClientFacadeService'],
})
export class ClientModule {}
