import { PropertyValueType } from "../Entity";
import { ObjectProperty, Property, Paths, ArrayProperty } from "../jsonSchema";
import { SortOrder } from "../SortOrder";
import { NextIndex, Join, NeverIfEmpty, ArrayItem } from "../utils";

export type PushToArray<T extends ObjectProperty> = NeverIfEmpty<{
  -readonly [K in Paths<T> as DeepPropOperators<T, K> extends never ? never : Join<K>]?: DeepPropOperators<T, K>;
}>

type OperatorValueType<T extends ArrayProperty> =
  | ArrayItem<PropertyValueType<T>>
  | {
    $each: PropertyValueType<T>;
    $slice?: number;
    $position?: number;
    $sort?: T["items"] extends ObjectProperty
      ? 1 | -1 | SortOrder<T["items"]>
      : 1 | -1
  };

type DeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? DeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : never
    : T extends ArrayProperty
      ? OperatorValueType<T>
      : never;
