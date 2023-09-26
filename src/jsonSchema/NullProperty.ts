import { Property } from "../jsonSchema";

export interface NullProperty {
    readonly type: "null";
}

export type NullValueType<T extends Property> = T extends NullProperty ? null : never;
