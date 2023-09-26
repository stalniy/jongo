import { NonEmptyObject } from "../utils";
import { Property, ValueTypeOf } from "./Property";

export interface ObjectProperty {
    readonly type: "object";
    readonly properties?: {
      [key: string]: Property
    };
    readonly required?: ReadonlyArray<string>;
    readonly oneOf?: ReadonlyArray<ObjectProperty>;
}

export type ObjectValueType<T extends Property> =
  T extends ObjectProperty
    ? ObjectShapeType<T> & ObjectDiscriminatorType<T>
    : never;

type ObjectShapeType<T extends ObjectProperty> = T extends { properties: Record<string, Property> }
  ? ObjectWithPropsShapeType<T>
  : Record<string, unknown>;

type ArrayItem<T> = T extends ReadonlyArray<unknown> ? T[number] : never;
type ObjectWithPropsShapeType<T extends ObjectProperty> = NonEmptyObject<{
    [K in ArrayItem<T['required']> & keyof T['properties']]: T['properties'][K] extends Property
    ? ValueTypeOf<T['properties'][K]>
    : never
}> & NonEmptyObject<{
    [O in Exclude<keyof T['properties'], ArrayItem<T['required']>>]?: T['properties'][O] extends Property
    ? ValueTypeOf<T['properties'][O]>
    : never
}>;

type ObjectDiscriminatorType<T extends ObjectProperty> =
  T extends { oneOf: ReadonlyArray<ObjectProperty> }
    ? ObjectValueType<T["oneOf"][number]>
    : unknown;

type C = ObjectValueType<{
  type: "object",
  required: ["type"],
  properties: {
    type: {
      type: "string",
      const: "dog",
    },
    wool: { type: "string" }
  },
} |
{
  type: "object",
  required: ["type"],
  properties: {
    type: {
      type: "string",
      const: "human",
    },
    skin: { type: "string" }
  },
}>

type A = [1, 2, 3]
type B = A[number]
