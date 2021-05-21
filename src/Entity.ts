import { ObjectProperty, Property, ValueTypeOf } from "./jsonSchema";

declare const SCHEMA: unique symbol;
export type Entity<T extends ObjectProperty> = PropertyValueType<T> & { [SCHEMA]?: T };

export type SchemaOf<T> = T extends Entity<infer Schema> ? Schema : never;

export type PropertyValueType<T extends Property> = ValueTypeOf<T>;
