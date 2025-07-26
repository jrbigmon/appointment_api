export class ClientInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IClientFacadeService {
  findById(id: string): Promise<ClientInterface | null>;
}
