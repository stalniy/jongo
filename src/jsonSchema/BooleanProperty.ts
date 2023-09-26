import { Property } from "./Property";

export interface BooleanProperty {
    readonly type: "boolean";
    readonly default?: boolean;
}

export type BooleanValueType<T extends Property> = T extends BooleanProperty ? boolean : never;
