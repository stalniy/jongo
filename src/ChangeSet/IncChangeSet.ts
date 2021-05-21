import { NumberProperty, ObjectProperty, Property, Paths } from "../jsonSchema";
import { Join, NextIndex, NeverIfEmpty } from "../utils";

export type IncChangeSet<T extends ObjectProperty> = NeverIfEmpty<{
  -readonly [K in Paths<T> as DeepPropOperators<T, K> extends never ? never : Join<K>]?: number
}>;

type DeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? DeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : never
    : T extends NumberProperty
      ? true
      : never
