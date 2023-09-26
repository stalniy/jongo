import { Property } from "../jsonSchema";

export interface NumberProperty {
    readonly type: "number";
    readonly maximum?: number;
    readonly minimum?: number;
    readonly exclusiveMinimum?: number;
    readonly exclusiveMaximum?: number;
    readonly multipleOf?: number;
    readonly default?: number;
}

export type NumberValueType<T extends Property> = T extends NumberProperty ? number : never;
