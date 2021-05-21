import { ObjectProperty } from "./jsonSchema";

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export declare abstract class Container<T extends ObjectProperty> {
  protected __box__?: T;
}

export type DeepPartial<T> = T extends Record<string, unknown>
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type PrevIndex = [
  never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]
];
export type NextIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type JoinableItem = string | number | boolean | bigint;
export type Join<T extends unknown[], D extends string = "."> =
  T extends [] ? '' :
  T extends [JoinableItem] ? `${T[0]}` :
  T extends [JoinableItem, JoinableItem] ? `${T[0]}${D}${T[1]}` :
  T extends [JoinableItem, JoinableItem, JoinableItem] ? `${T[0]}${D}${T[1]}${D}${T[2]}` :
  T extends [JoinableItem, JoinableItem, JoinableItem, JoinableItem] ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}` :
  T extends [JoinableItem, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
  string;

export type ArrayItem<T> = T extends Array<infer Item> ? Item : unknown;

export type NeverIfEmpty<T> = T extends Record<string, never> ? never : T;
export type NonEmptyObject<T> = T extends Record<string, never> ? unknown : T;
