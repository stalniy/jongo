import { ArrayProperty, ArrayValueType } from "./ArrayProperty";
import { BooleanProperty, BooleanValueType } from "./BooleanProperty";
import { MixedProperty, MixedPropertyValueType } from "./MixedProperty";
import { NullProperty, NullValueType } from "./NullProperty";
import { NumberProperty, NumberValueType } from "./NumberProperty";
import { ObjectProperty, ObjectValueType } from "./ObjectProperty";
import { StringProperty, StringValueType } from "./StringProperty";

export type Property = TypedProperty | MixedProperty;

export type TypedProperty =
  | StringProperty
  | NumberProperty
  | NullProperty
  | BooleanProperty
  | ObjectProperty
  | ArrayProperty

export type ValueTypeOf<T extends Property> = T extends TypedProperty
  ? TypedPropertyValueType<T>
  : MixedPropertyValueType<T>;

type TypedPropertyValueType<T extends Property> = {
  string: StringValueType<T>;
  number: NumberValueType<T>;
  null: NullValueType<T>;
  boolean: BooleanValueType<T>;
  array: ArrayValueType<T>;
  object: ObjectValueType<T>
}[Extract<T['type'], string>]
