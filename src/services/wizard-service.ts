import type { IdGenerator, WizardHouseQuery, WritableRepository } from "../interfaces";
import type { NewWizard, Wizard } from "../types";

export class WizardService {
  constructor(
    private readonly repository: WritableRepository<Wizard> & WizardHouseQuery,
    private readonly idGenerator: IdGenerator
  ) {}

  register(data: NewWizard): Wizard {
    const wizard: Wizard = { id: this.idGenerator.next(), ...data };
    this.repository.add(wizard);
    return wizard;
  }

  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.repository.findByHouse(house);
  }
}
