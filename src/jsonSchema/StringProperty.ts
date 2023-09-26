import { ObjectId } from "mongodb";
import { Property } from "./Property";

export interface StringProperty {
  readonly type: "string";
  readonly enum?: ReadonlyArray<string>;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly pattern?: string;
  readonly format?: "date-time" | "email" | "hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "uri-template" | "json-pointer" | "object-id"
  readonly default?: string;
}

export type StringValueType<T extends Property> = T extends StringProperty
  ? T extends { enum: ReadonlyArray<string> }
    ? T["enum"][number]
    : T extends { const: string }
    ? T["const"]
    : T extends { format: keyof Formats }
      ? Formats[T["format"]]
      : string
  : never;

type Formats = {
  "date-time": Date
  "object-id": ObjectId
}
