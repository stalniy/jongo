import { PrevIndex } from "../utils";
import { ObjectProperty } from "./ObjectProperty";

export function jsonSchema<T extends ObjectProperty>(schema: T) {
    return schema;
}

export type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends ObjectProperty
  ?
    { [K in keyof T["properties"]]-?: K extends string | number
      ? [K] | [K, ...Paths<T["properties"][K], PrevIndex[D]>]
      : never
    }[keyof T["properties"]]
  : never;
