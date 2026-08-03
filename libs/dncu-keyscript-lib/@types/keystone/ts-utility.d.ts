// type IsNever<T> = [T] extends [never] ? true : false;
// type IsUnion<T, U = T> = IsNever<T> extends true
//   ? false
//   : T extends U
//   ? IsNever<Exclude<U, T>> extends true
//     ? false
//     : true
//   : false;
//   type SingleKeyObject<T, K = keyof T> = IsNever<K> extends true
//   ? never
//   : IsUnion<K> extends true
//   ? never
//   : T;

// type Unionize<T extends object> = {
//     [k in keyof T]: { k: T[k] }
// }[keyof T];

type Split<T> = {
    [K in keyof T]: {
        [K2 in K]: T[K]
    }
}[keyof T]

type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S

type CamelToSnakeCase<S extends string> =
    S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S

type SnakeToCamelCaseNested<T> = T extends object ? {
    [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>
} : T

type CamelToPascalCase<S extends string> = Capitalize<S>
type PascalToCamelCase<S extends string> = Uncapitalize<S>
type PascalToSnakeCase<S extends string> = CamelToSnakeCase<Uncapitalize<S>>
type SnakeToPascalCase<S extends string> = Capitalize<SnakeToCamelCase<S>>