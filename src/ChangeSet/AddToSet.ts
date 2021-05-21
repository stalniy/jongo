import { PropertyValueType } from "../Entity";
import { ArrayProperty, ObjectProperty, Property, Paths } from "../jsonSchema";
import { Join, NextIndex, ArrayItem, NeverIfEmpty } from "../utils";

export type AddToSet<T extends ObjectProperty> = NeverIfEmpty<{
  -readonly [K in Paths<T> as DeepPropOperators<T, K> extends never ? never : Join<K>]?: DeepPropOperators<T, K>;
}>;

type OperatorValueType<T extends ArrayProperty> =
  | ArrayItem<PropertyValueType<T>>
  | { $each: PropertyValueType<T> }

type DeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? DeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : never
    : T extends ArrayProperty
      ? OperatorValueType<T>
      : never;
