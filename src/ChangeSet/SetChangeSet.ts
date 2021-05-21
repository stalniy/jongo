import { PropertyValueType } from "../Entity";
import { ObjectProperty, Property, Paths } from "../jsonSchema";
import { NextIndex, Join, PrevIndex, DeepPartial } from "../utils";

export type SetChangeSet<T extends ObjectProperty> = {
  -readonly [K in Paths<T> as Join<K>]?: DeepPropOperators<T, K>
}

type OperatorValueType<T extends Property> = PropertyValueType<T>;

type DeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? TIndex extends PrevIndex[TKeys["length"]]
        ? DeepPartial<OperatorValueType<T["properties"][TKey]>>
        : DeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : never
    : OperatorValueType<T>
