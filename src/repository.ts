import { ValidateSpellPower } from "./decorators";
import type { Repository as IRepository, WizardHouseQuery } from "./interfaces";
import type { Entity, Spell, Wizard } from "./types";

export class Repository<T extends Entity> implements IRepository<T> {
  protected readonly items = new Map<number, T>();

  add(item: T): void {
    if (this.items.has(item.id)) {
      throw new Error(`Entity with id ${item.id} already exists`);
    }
    this.items.set(item.id, item);
  }

  getById(id: number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return [...this.items.values()];
  }

  remove(id: number): boolean {
    return this.items.delete(id);
  }
}

export class WizardRepository extends Repository<Wizard> implements WizardHouseQuery {
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
