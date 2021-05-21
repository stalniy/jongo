import { NonEmptyObject, PrevIndex } from "./utils";
import { ObjectId } from "mongodb";

export function jsonSchema<T extends ObjectProperty>(schema: T) {
  return schema;
}

export type Property =
  | StringProperty
  | NumberProperty
  | NullProperty
  | BooleanProperty
  | ObjectProperty
  | ArrayProperty

interface StringProperty {
  readonly type: "string";
  readonly enum?: ReadonlyArray<string>;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly pattern?: string;
  readonly format?: "date-time" | "email" | "hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "uri-template" | "json-pointer" | "object-id"
  readonly default?: string;
}

export interface NumberProperty {
  readonly type: "number";
  readonly maximum?: number;
  readonly minimum?: number;
  readonly exclusiveMinimum?: number;
  readonly exclusiveMaximum?: number;
  readonly multipleOf?: number;
  readonly default?: number;
}

interface NullProperty {
  readonly type: "null";
}

interface BooleanProperty {
  readonly type: "boolean";
  readonly default?: boolean;
}

export interface ObjectProperty {
  readonly type: "object";
  readonly properties?: {
    [key: string]: Property
  };
  readonly required?: ReadonlyArray<string>;
  readonly oneOf?: ReadonlyArray<ObjectProperty>;
}

export interface ArrayProperty {
  readonly type: "array";
  readonly items?: Property;
  readonly maxItems?: number;
  readonly minItems?: number;
  readonly uniqueItems?: boolean;
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

type Formats = {
  "date-time": Date
  "object-id": ObjectId
}

export type ValueTypeOf<T extends Property> = {
  string: StringValueType<T>;
  number: number;
  boolean: boolean;
  null: null;
  array: ArrayValueType<T>;
  object: ObjectValueType<T>;
}[T["type"]];

type ArrayItem<T> = T extends ReadonlyArray<unknown> ? T[number] : never;
type ObjectShapeType<T extends ObjectProperty> = NonEmptyObject<{
  [K in ArrayItem<T['required']>]: ValueTypeOf<T['properties'][K]>
}> & NonEmptyObject<{
  [O in Exclude<keyof T['properties'], ArrayItem<T['required']>>]?: ValueTypeOf<T['properties'][O]>
}>;

type ObjectValueType<T extends Property> =
  T extends ObjectProperty
    ? ObjectShapeType<T> & ObjectDiscriminatorType<T>
    : Record<string, unknown>;
type ObjectDiscriminatorType<T extends ObjectProperty> =
  T extends { oneOf: ReadonlyArray<ObjectProperty> }
    ? ObjectValueUnionType<T["oneOf"][number]>
    : unknown;

type ObjectValueUnionType<T extends ObjectProperty> = T extends any ? ObjectValueType<T> : unknown;

type StringValueType<T extends Property> =
  T extends StringProperty
    ? T extends { enum: ReadonlyArray<string> }
      ? T["enum"][number]
      : T extends { const: string }
        ? T["const"]
        : T extends { format: keyof Formats }
          ? Formats[T["format"]]
          : string
    : string;

type ArrayValueType<T extends Property> =
  T extends ArrayProperty
    ? ValueTypeOf<T["items"]>
    : unknown[]
