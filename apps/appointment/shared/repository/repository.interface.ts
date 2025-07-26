export interface IRepository<T> {
  create(item: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<void>;
  findAll<O>(options?: O): Promise<T[]>;
}
