// type Paths<T, D extends number = 10> = [D] extends [never]
//   ? never
//   : T extends object
//     ?
//       { [K in keyof T]-?: K extends string | number
//           ? [K] | [K, ...Paths<T[K], Prev[D]>]
//           : never
//       }[keyof T] : never

// type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

// type NextIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

// interface User {
//   name: string;
//   age: number;
//   address: {
//     city: string;
//     country: string;
//   }
// }

// type Primitive = string | number | boolean | bigint;
// type Join<T extends unknown[], D extends string> =
//     T extends [] ? '' :
//     T extends [Primitive] ? `${T[0]}` :
//     T extends [Primitive, Primitive] ? `${T[0]}${D}${T[1]}` :
//     T extends [Primitive, Primitive, Primitive] ? `${T[0]}${D}${T[1]}${D}${T[2]}` :
//     T extends [Primitive, Primitive, Primitive, Primitive] ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}` :
//     T extends [Primitive, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
//     string;

// type Keys = Paths<User>



// type m = {
//   [k in Keys as Join<k, ".">]?: PropType2<User, k>
// }

// const a: m = {
//   "address.city": ""
// }

// type PropType2<T extends {}, TKeys extends ReadonlyArray<string>, TIndex extends number = 0, TKey extends TKeys[TIndex] = TKeys[TIndex]> =
//   TKey extends keyof T
//     ? TIndex extends Prev[TKeys["length"]]
//       ? T[TKey]
//       : PropType2<T[TKey], TKeys, NextIndex[TIndex]>
//     : unknown


// type m2 = {
//   [K in Keys]?: PropType<User, K>
// }

// type PropType<T, Path extends string> =
//   string extends Path
//     ? unknown
//     : Path extends keyof T
//       ? T[Path]
//       : Path extends `${infer K}.${infer R}`
//         ? K extends keyof T ? PropType<T[K], R>
//         : unknown
//       : unknown;
