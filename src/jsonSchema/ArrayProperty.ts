import { Property, ValueTypeOf } from "./Property";

export interface ArrayProperty {
    readonly type: "array";
    readonly items?: Property;
    readonly maxItems?: number;
    readonly minItems?: number;
    readonly uniqueItems?: boolean;
}

export type ArrayValueType<T extends Property> = T extends ArrayProperty
    ? Array<
        T extends { items: Property }
            ? ValueTypeOf<T["items"]>
            : unknown
        >
    : never;
