import { handleSpellCast } from "./events/spell-cast-handler";
import { isWizard } from "./guards/wizard-guards";
import { SequentialIdGenerator } from "./id-generator";
import { SpellRepository, WizardRepository } from "./repository";
import { SpellCalculator } from "./services/spell-calculator";
import { WizardService } from "./services/wizard-service";

const wizardService = new WizardService(new WizardRepository(), new SequentialIdGenerator());
const spells = new SpellRepository();
const calculator = new SpellCalculator();

const harry = wizardService.register({ name: "Harry Potter", house: "Gryffindor", level: 5, active: true });
const draco = wizardService.register({ name: "Draco Malfoy", house: "Slytherin", level: 4, active: true });
wizardService.register({ name: "Hermione Granger", house: "Gryffindor", level: 7, active: true });
wizardService.register({ name: "Luna Lovegood", house: "Ravenclaw", level: 5, active: true });
console.log(harry);
console.log(draco);

console.log("Gryffindor :", wizardService.findByHouse("Gryffindor").map(w => w.name));
console.log("Hufflepuff :", wizardService.findByHouse("Hufflepuff").map(w => w.name));

handleSpellCast({
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus"
});

spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50
});
console.log("Sort valide ajouté :", spells.getById(102));

try {
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10
  });
} catch (error) {
  console.log("Sort refusé :", (error as Error).message);
}
console.log("Nombre de sorts :", spells.getAll().length);

console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true
};

const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true
};

console.log(isWizard(validData));
console.log(isWizard(invalidData));
