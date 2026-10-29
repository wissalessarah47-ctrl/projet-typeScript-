import type { IdGenerator } from "./interfaces";

export class SequentialIdGenerator implements IdGenerator {
  constructor(private current = 0) {}

  next(): number {
    this.current += 1;
    return this.current;
  }
}
