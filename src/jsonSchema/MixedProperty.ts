import { Property, TypedProperty, ValueTypeOf } from "./Property";

export interface MixedProperty extends Omit<TypedProperty, 'type'> {
    readonly type: ReadonlyArray<TypedProperty['type']>
}

export type MixedPropertyValueType<T extends Property> = T extends MixedProperty
    ? ValueTypeOf<DistributeMixedProperty<T, T['type'][number]>>
    : never ;

type DistributeMixedProperty<T extends MixedProperty, TType extends T['type'][number]> = TType extends string
    ? Omit<T, 'type'> & { type: TType }
    : never;
