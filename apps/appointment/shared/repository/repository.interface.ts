export interface IRepository<T> {
  save(item: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T | null>;
}
