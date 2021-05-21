import { ObjectProperty, Property, Paths } from "./jsonSchema";
import { Entity, SchemaOf, PropertyValueType } from "./Entity";
import { Join, NextIndex } from "./utils";

export type Where<T extends Entity<any>> = WhereShape<SchemaOf<T>>;

type WhereShape<T extends ObjectProperty> =
  & ObjectOperators<T>
  & WhereItem<T>
  & DocumentOperators<T>;

type DocumentOperators<T extends ObjectProperty> = {
  $and?: WhereShape<T>[];
  $or?: WhereShape<T>[];
  $nor?: WhereShape<T>[];
  $where?(this: PropertyValueType<T>): boolean;
};

type WhereItem<T extends ObjectProperty> = {
  -readonly [K in keyof T["properties"]]?: OperatorsForProp<T["properties"][K]>
};

export type OperatorsForProp<TProp extends Property, TValue = PropertyValueType<TProp>> = {
  null: OperatorsExpr<TValue>;
  string: OperatorsExpr<TValue, StringOperators<TValue>>;
  number: OperatorsExpr<TValue, NumberOperators<TValue>>;
  boolean: OperatorsExpr<TValue>;
  object: OperatorsExpr<TValue, ObjectOperators<TProp>>;
  array: OperatorsExpr<TValue, ArrayOperators<TProp, TValue extends any[] ? TValue[number] : never>>;
}[TProp["type"]];

type ComparableOperators<V> =
  | { $lt: V }
  | { $lte: V }
  | { $gte: V }
  | { $gt: V }
  | { $eq: V }
  | { $in: V[] }
  | { $nin: V[] }
;
type StringOperators<V> =
  | ComparableOperators<V>
  | { $regex: RegExp }
  | { $text: FullTextSearch }
;
type NumberOperators<V> =
  | ComparableOperators<V>
  | { $mod: [number, number] };

type ArrayOperators<TProp extends Property, V> =
  | { $size: number }
  | { $all: V[] }
  | { $in: V[] }
  | { $nin: V[] }
  | { $elemMatch: ElemMatchQuery<TProp> }

type ObjectOperators<TProp extends Property> = TProp extends ObjectProperty
  ? {
      -readonly [K in Paths<TProp> as Join<K>]?: ObjectDeepPropOperators<TProp, K>
    }
  : unknown;

type ObjectDeepPropOperators<T extends Property, TKeys extends ReadonlyArray<PropertyKey>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
  T extends ObjectProperty
    ? TKey extends keyof T["properties"]
      ? ObjectDeepPropOperators<T["properties"][TKey], TKeys, NextIndex[TIndex]>
      : unknown
    : OperatorsForProp<T>

type OperatorsExpr<V, Query = never> = BaseOperatorsExpr<
  V,
  Query | NotOperator<V, Query> | { $exists: boolean }
>;
type NotOperator<V, Query> = { $not: BaseOperatorsExpr<V, Query> };
type BaseOperatorsExpr<V, Query> = V | null | Query;

type FullTextSearch = {
  $search: string;
  $language?: string;
  $caseSensitive?: boolean;
  $diacriticSensitive?: boolean;
}

type ElemMatchQuery<TProp extends Property> = TProp extends { items: ObjectProperty }
  ? WhereItem<TProp["items"]>
  : OperatorsForProp<TProp>;
