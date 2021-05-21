import { ObjectProperty, Paths } from "./jsonSchema";
import { Join } from "./utils";

export type SortOrder<T extends ObjectProperty> = {
  -readonly [K in Paths<T> as Join<K>]?: 1 | -1
};
