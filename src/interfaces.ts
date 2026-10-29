import type { Entity, Wizard } from "./types";

export interface ReadableRepository<T extends Entity> {
  getById(id: number): T | undefined;
  getAll(): T[];
}

export interface WritableRepository<T extends Entity> {
  add(item: T): void;
  remove(id: number): boolean;
}

export interface Repository<T extends Entity>
  extends ReadableRepository<T>, WritableRepository<T> {}

export interface WizardHouseQuery {
  findByHouse(house: Wizard["house"]): Wizard[];
}

export interface IdGenerator {
  next(): number;
}
