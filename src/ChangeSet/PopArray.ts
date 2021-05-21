import { ObjectProperty, Property, Paths, ArrayProperty } from "../jsonSchema";
import { NextIndex, Join, NeverIfEmpty } from "../utils";

export type PopArray<T extends ObjectProperty> = NeverIfEmpty<{
  -readonly [K in Paths<T> as DeepPropOperators<T, K> extends never ? never : Join<K>]?: 1 | -1;
}>

type DeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? DeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : never
    : T extends ArrayProperty
      ? true
      : never;
