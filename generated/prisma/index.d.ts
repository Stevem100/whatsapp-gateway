
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * One WhatsApp account connection. Baileys credentials blob is stored in `creds`.
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model WaKey
 * Baileys signal-protocol keys (pre-keys, sessions, sender-keys), one row per key.
 */
export type WaKey = $Result.DefaultSelection<Prisma.$WaKeyPayload>
/**
 * Model Message
 * Message history for the inbox and the chats view.
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model BotRule
 * Auto-reply bot rule. First matching rule (by priority desc) wins.
 */
export type BotRule = $Result.DefaultSelection<Prisma.$BotRulePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.waKey`: Exposes CRUD operations for the **WaKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WaKeys
    * const waKeys = await prisma.waKey.findMany()
    * ```
    */
  get waKey(): Prisma.WaKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.botRule`: Exposes CRUD operations for the **BotRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BotRules
    * const botRules = await prisma.botRule.findMany()
    * ```
    */
  get botRule(): Prisma.BotRuleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    WaKey: 'WaKey',
    Message: 'Message',
    BotRule: 'BotRule'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "waKey" | "message" | "botRule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      WaKey: {
        payload: Prisma.$WaKeyPayload<ExtArgs>
        fields: Prisma.WaKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WaKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WaKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          findFirst: {
            args: Prisma.WaKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WaKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          findMany: {
            args: Prisma.WaKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>[]
          }
          create: {
            args: Prisma.WaKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          createMany: {
            args: Prisma.WaKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WaKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>[]
          }
          delete: {
            args: Prisma.WaKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          update: {
            args: Prisma.WaKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          deleteMany: {
            args: Prisma.WaKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WaKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WaKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>[]
          }
          upsert: {
            args: Prisma.WaKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaKeyPayload>
          }
          aggregate: {
            args: Prisma.WaKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWaKey>
          }
          groupBy: {
            args: Prisma.WaKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<WaKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.WaKeyCountArgs<ExtArgs>
            result: $Utils.Optional<WaKeyCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      BotRule: {
        payload: Prisma.$BotRulePayload<ExtArgs>
        fields: Prisma.BotRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          findFirst: {
            args: Prisma.BotRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          findMany: {
            args: Prisma.BotRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>[]
          }
          create: {
            args: Prisma.BotRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          createMany: {
            args: Prisma.BotRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>[]
          }
          delete: {
            args: Prisma.BotRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          update: {
            args: Prisma.BotRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          deleteMany: {
            args: Prisma.BotRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>[]
          }
          upsert: {
            args: Prisma.BotRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotRulePayload>
          }
          aggregate: {
            args: Prisma.BotRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBotRule>
          }
          groupBy: {
            args: Prisma.BotRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotRuleCountArgs<ExtArgs>
            result: $Utils.Optional<BotRuleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    waKey?: WaKeyOmit
    message?: MessageOmit
    botRule?: BotRuleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    keys: number
    messages: number
    rules: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    keys?: boolean | SessionCountOutputTypeCountKeysArgs
    messages?: boolean | SessionCountOutputTypeCountMessagesArgs
    rules?: boolean | SessionCountOutputTypeCountRulesArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaKeyWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotRuleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    qr: string | null
    qrGeneratedAt: Date | null
    botEnabled: boolean | null
    webhookUrl: string | null
    connectedJid: string | null
    connectedPhone: string | null
    lastConnectedAt: Date | null
    creds: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    qr: string | null
    qrGeneratedAt: Date | null
    botEnabled: boolean | null
    webhookUrl: string | null
    connectedJid: string | null
    connectedPhone: string | null
    lastConnectedAt: Date | null
    creds: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    name: number
    status: number
    qr: number
    qrGeneratedAt: number
    botEnabled: number
    webhookUrl: number
    connectedJid: number
    connectedPhone: number
    lastConnectedAt: number
    creds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    qr?: true
    qrGeneratedAt?: true
    botEnabled?: true
    webhookUrl?: true
    connectedJid?: true
    connectedPhone?: true
    lastConnectedAt?: true
    creds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    qr?: true
    qrGeneratedAt?: true
    botEnabled?: true
    webhookUrl?: true
    connectedJid?: true
    connectedPhone?: true
    lastConnectedAt?: true
    creds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    qr?: true
    qrGeneratedAt?: true
    botEnabled?: true
    webhookUrl?: true
    connectedJid?: true
    connectedPhone?: true
    lastConnectedAt?: true
    creds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    name: string
    status: string
    qr: string | null
    qrGeneratedAt: Date | null
    botEnabled: boolean
    webhookUrl: string | null
    connectedJid: string | null
    connectedPhone: string | null
    lastConnectedAt: Date | null
    creds: string | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    qr?: boolean
    qrGeneratedAt?: boolean
    botEnabled?: boolean
    webhookUrl?: boolean
    connectedJid?: boolean
    connectedPhone?: boolean
    lastConnectedAt?: boolean
    creds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    keys?: boolean | Session$keysArgs<ExtArgs>
    messages?: boolean | Session$messagesArgs<ExtArgs>
    rules?: boolean | Session$rulesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    qr?: boolean
    qrGeneratedAt?: boolean
    botEnabled?: boolean
    webhookUrl?: boolean
    connectedJid?: boolean
    connectedPhone?: boolean
    lastConnectedAt?: boolean
    creds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    qr?: boolean
    qrGeneratedAt?: boolean
    botEnabled?: boolean
    webhookUrl?: boolean
    connectedJid?: boolean
    connectedPhone?: boolean
    lastConnectedAt?: boolean
    creds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    qr?: boolean
    qrGeneratedAt?: boolean
    botEnabled?: boolean
    webhookUrl?: boolean
    connectedJid?: boolean
    connectedPhone?: boolean
    lastConnectedAt?: boolean
    creds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "qr" | "qrGeneratedAt" | "botEnabled" | "webhookUrl" | "connectedJid" | "connectedPhone" | "lastConnectedAt" | "creds" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    keys?: boolean | Session$keysArgs<ExtArgs>
    messages?: boolean | Session$messagesArgs<ExtArgs>
    rules?: boolean | Session$rulesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      keys: Prisma.$WaKeyPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      rules: Prisma.$BotRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      status: string
      qr: string | null
      qrGeneratedAt: Date | null
      botEnabled: boolean
      webhookUrl: string | null
      connectedJid: string | null
      connectedPhone: string | null
      lastConnectedAt: Date | null
      creds: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    keys<T extends Session$keysArgs<ExtArgs> = {}>(args?: Subset<T, Session$keysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Session$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Session$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rules<T extends Session$rulesArgs<ExtArgs> = {}>(args?: Subset<T, Session$rulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly name: FieldRef<"Session", 'String'>
    readonly status: FieldRef<"Session", 'String'>
    readonly qr: FieldRef<"Session", 'String'>
    readonly qrGeneratedAt: FieldRef<"Session", 'DateTime'>
    readonly botEnabled: FieldRef<"Session", 'Boolean'>
    readonly webhookUrl: FieldRef<"Session", 'String'>
    readonly connectedJid: FieldRef<"Session", 'String'>
    readonly connectedPhone: FieldRef<"Session", 'String'>
    readonly lastConnectedAt: FieldRef<"Session", 'DateTime'>
    readonly creds: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.keys
   */
  export type Session$keysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    where?: WaKeyWhereInput
    orderBy?: WaKeyOrderByWithRelationInput | WaKeyOrderByWithRelationInput[]
    cursor?: WaKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WaKeyScalarFieldEnum | WaKeyScalarFieldEnum[]
  }

  /**
   * Session.messages
   */
  export type Session$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Session.rules
   */
  export type Session$rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    where?: BotRuleWhereInput
    orderBy?: BotRuleOrderByWithRelationInput | BotRuleOrderByWithRelationInput[]
    cursor?: BotRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BotRuleScalarFieldEnum | BotRuleScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model WaKey
   */

  export type AggregateWaKey = {
    _count: WaKeyCountAggregateOutputType | null
    _min: WaKeyMinAggregateOutputType | null
    _max: WaKeyMaxAggregateOutputType | null
  }

  export type WaKeyMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    category: string | null
    keyId: string | null
    data: string | null
  }

  export type WaKeyMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    category: string | null
    keyId: string | null
    data: string | null
  }

  export type WaKeyCountAggregateOutputType = {
    id: number
    sessionId: number
    category: number
    keyId: number
    data: number
    _all: number
  }


  export type WaKeyMinAggregateInputType = {
    id?: true
    sessionId?: true
    category?: true
    keyId?: true
    data?: true
  }

  export type WaKeyMaxAggregateInputType = {
    id?: true
    sessionId?: true
    category?: true
    keyId?: true
    data?: true
  }

  export type WaKeyCountAggregateInputType = {
    id?: true
    sessionId?: true
    category?: true
    keyId?: true
    data?: true
    _all?: true
  }

  export type WaKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaKey to aggregate.
     */
    where?: WaKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaKeys to fetch.
     */
    orderBy?: WaKeyOrderByWithRelationInput | WaKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WaKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WaKeys
    **/
    _count?: true | WaKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WaKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WaKeyMaxAggregateInputType
  }

  export type GetWaKeyAggregateType<T extends WaKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateWaKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWaKey[P]>
      : GetScalarType<T[P], AggregateWaKey[P]>
  }




  export type WaKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaKeyWhereInput
    orderBy?: WaKeyOrderByWithAggregationInput | WaKeyOrderByWithAggregationInput[]
    by: WaKeyScalarFieldEnum[] | WaKeyScalarFieldEnum
    having?: WaKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WaKeyCountAggregateInputType | true
    _min?: WaKeyMinAggregateInputType
    _max?: WaKeyMaxAggregateInputType
  }

  export type WaKeyGroupByOutputType = {
    id: string
    sessionId: string
    category: string
    keyId: string
    data: string
    _count: WaKeyCountAggregateOutputType | null
    _min: WaKeyMinAggregateOutputType | null
    _max: WaKeyMaxAggregateOutputType | null
  }

  type GetWaKeyGroupByPayload<T extends WaKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WaKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WaKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WaKeyGroupByOutputType[P]>
            : GetScalarType<T[P], WaKeyGroupByOutputType[P]>
        }
      >
    >


  export type WaKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    category?: boolean
    keyId?: boolean
    data?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waKey"]>

  export type WaKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    category?: boolean
    keyId?: boolean
    data?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waKey"]>

  export type WaKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    category?: boolean
    keyId?: boolean
    data?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waKey"]>

  export type WaKeySelectScalar = {
    id?: boolean
    sessionId?: boolean
    category?: boolean
    keyId?: boolean
    data?: boolean
  }

  export type WaKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "category" | "keyId" | "data", ExtArgs["result"]["waKey"]>
  export type WaKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type WaKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type WaKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $WaKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WaKey"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      category: string
      keyId: string
      data: string
    }, ExtArgs["result"]["waKey"]>
    composites: {}
  }

  type WaKeyGetPayload<S extends boolean | null | undefined | WaKeyDefaultArgs> = $Result.GetResult<Prisma.$WaKeyPayload, S>

  type WaKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WaKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WaKeyCountAggregateInputType | true
    }

  export interface WaKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WaKey'], meta: { name: 'WaKey' } }
    /**
     * Find zero or one WaKey that matches the filter.
     * @param {WaKeyFindUniqueArgs} args - Arguments to find a WaKey
     * @example
     * // Get one WaKey
     * const waKey = await prisma.waKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WaKeyFindUniqueArgs>(args: SelectSubset<T, WaKeyFindUniqueArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WaKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WaKeyFindUniqueOrThrowArgs} args - Arguments to find a WaKey
     * @example
     * // Get one WaKey
     * const waKey = await prisma.waKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WaKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, WaKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyFindFirstArgs} args - Arguments to find a WaKey
     * @example
     * // Get one WaKey
     * const waKey = await prisma.waKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WaKeyFindFirstArgs>(args?: SelectSubset<T, WaKeyFindFirstArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WaKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyFindFirstOrThrowArgs} args - Arguments to find a WaKey
     * @example
     * // Get one WaKey
     * const waKey = await prisma.waKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WaKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, WaKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WaKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WaKeys
     * const waKeys = await prisma.waKey.findMany()
     * 
     * // Get first 10 WaKeys
     * const waKeys = await prisma.waKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const waKeyWithIdOnly = await prisma.waKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WaKeyFindManyArgs>(args?: SelectSubset<T, WaKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WaKey.
     * @param {WaKeyCreateArgs} args - Arguments to create a WaKey.
     * @example
     * // Create one WaKey
     * const WaKey = await prisma.waKey.create({
     *   data: {
     *     // ... data to create a WaKey
     *   }
     * })
     * 
     */
    create<T extends WaKeyCreateArgs>(args: SelectSubset<T, WaKeyCreateArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WaKeys.
     * @param {WaKeyCreateManyArgs} args - Arguments to create many WaKeys.
     * @example
     * // Create many WaKeys
     * const waKey = await prisma.waKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WaKeyCreateManyArgs>(args?: SelectSubset<T, WaKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WaKeys and returns the data saved in the database.
     * @param {WaKeyCreateManyAndReturnArgs} args - Arguments to create many WaKeys.
     * @example
     * // Create many WaKeys
     * const waKey = await prisma.waKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WaKeys and only return the `id`
     * const waKeyWithIdOnly = await prisma.waKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WaKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, WaKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WaKey.
     * @param {WaKeyDeleteArgs} args - Arguments to delete one WaKey.
     * @example
     * // Delete one WaKey
     * const WaKey = await prisma.waKey.delete({
     *   where: {
     *     // ... filter to delete one WaKey
     *   }
     * })
     * 
     */
    delete<T extends WaKeyDeleteArgs>(args: SelectSubset<T, WaKeyDeleteArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WaKey.
     * @param {WaKeyUpdateArgs} args - Arguments to update one WaKey.
     * @example
     * // Update one WaKey
     * const waKey = await prisma.waKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WaKeyUpdateArgs>(args: SelectSubset<T, WaKeyUpdateArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WaKeys.
     * @param {WaKeyDeleteManyArgs} args - Arguments to filter WaKeys to delete.
     * @example
     * // Delete a few WaKeys
     * const { count } = await prisma.waKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WaKeyDeleteManyArgs>(args?: SelectSubset<T, WaKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WaKeys
     * const waKey = await prisma.waKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WaKeyUpdateManyArgs>(args: SelectSubset<T, WaKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaKeys and returns the data updated in the database.
     * @param {WaKeyUpdateManyAndReturnArgs} args - Arguments to update many WaKeys.
     * @example
     * // Update many WaKeys
     * const waKey = await prisma.waKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WaKeys and only return the `id`
     * const waKeyWithIdOnly = await prisma.waKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WaKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, WaKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WaKey.
     * @param {WaKeyUpsertArgs} args - Arguments to update or create a WaKey.
     * @example
     * // Update or create a WaKey
     * const waKey = await prisma.waKey.upsert({
     *   create: {
     *     // ... data to create a WaKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WaKey we want to update
     *   }
     * })
     */
    upsert<T extends WaKeyUpsertArgs>(args: SelectSubset<T, WaKeyUpsertArgs<ExtArgs>>): Prisma__WaKeyClient<$Result.GetResult<Prisma.$WaKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WaKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyCountArgs} args - Arguments to filter WaKeys to count.
     * @example
     * // Count the number of WaKeys
     * const count = await prisma.waKey.count({
     *   where: {
     *     // ... the filter for the WaKeys we want to count
     *   }
     * })
    **/
    count<T extends WaKeyCountArgs>(
      args?: Subset<T, WaKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WaKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WaKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WaKeyAggregateArgs>(args: Subset<T, WaKeyAggregateArgs>): Prisma.PrismaPromise<GetWaKeyAggregateType<T>>

    /**
     * Group by WaKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WaKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WaKeyGroupByArgs['orderBy'] }
        : { orderBy?: WaKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WaKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WaKey model
   */
  readonly fields: WaKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WaKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WaKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WaKey model
   */
  interface WaKeyFieldRefs {
    readonly id: FieldRef<"WaKey", 'String'>
    readonly sessionId: FieldRef<"WaKey", 'String'>
    readonly category: FieldRef<"WaKey", 'String'>
    readonly keyId: FieldRef<"WaKey", 'String'>
    readonly data: FieldRef<"WaKey", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WaKey findUnique
   */
  export type WaKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter, which WaKey to fetch.
     */
    where: WaKeyWhereUniqueInput
  }

  /**
   * WaKey findUniqueOrThrow
   */
  export type WaKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter, which WaKey to fetch.
     */
    where: WaKeyWhereUniqueInput
  }

  /**
   * WaKey findFirst
   */
  export type WaKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter, which WaKey to fetch.
     */
    where?: WaKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaKeys to fetch.
     */
    orderBy?: WaKeyOrderByWithRelationInput | WaKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaKeys.
     */
    cursor?: WaKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaKeys.
     */
    distinct?: WaKeyScalarFieldEnum | WaKeyScalarFieldEnum[]
  }

  /**
   * WaKey findFirstOrThrow
   */
  export type WaKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter, which WaKey to fetch.
     */
    where?: WaKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaKeys to fetch.
     */
    orderBy?: WaKeyOrderByWithRelationInput | WaKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaKeys.
     */
    cursor?: WaKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaKeys.
     */
    distinct?: WaKeyScalarFieldEnum | WaKeyScalarFieldEnum[]
  }

  /**
   * WaKey findMany
   */
  export type WaKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter, which WaKeys to fetch.
     */
    where?: WaKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaKeys to fetch.
     */
    orderBy?: WaKeyOrderByWithRelationInput | WaKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WaKeys.
     */
    cursor?: WaKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaKeys.
     */
    skip?: number
    distinct?: WaKeyScalarFieldEnum | WaKeyScalarFieldEnum[]
  }

  /**
   * WaKey create
   */
  export type WaKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a WaKey.
     */
    data: XOR<WaKeyCreateInput, WaKeyUncheckedCreateInput>
  }

  /**
   * WaKey createMany
   */
  export type WaKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WaKeys.
     */
    data: WaKeyCreateManyInput | WaKeyCreateManyInput[]
  }

  /**
   * WaKey createManyAndReturn
   */
  export type WaKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * The data used to create many WaKeys.
     */
    data: WaKeyCreateManyInput | WaKeyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaKey update
   */
  export type WaKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a WaKey.
     */
    data: XOR<WaKeyUpdateInput, WaKeyUncheckedUpdateInput>
    /**
     * Choose, which WaKey to update.
     */
    where: WaKeyWhereUniqueInput
  }

  /**
   * WaKey updateMany
   */
  export type WaKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WaKeys.
     */
    data: XOR<WaKeyUpdateManyMutationInput, WaKeyUncheckedUpdateManyInput>
    /**
     * Filter which WaKeys to update
     */
    where?: WaKeyWhereInput
    /**
     * Limit how many WaKeys to update.
     */
    limit?: number
  }

  /**
   * WaKey updateManyAndReturn
   */
  export type WaKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * The data used to update WaKeys.
     */
    data: XOR<WaKeyUpdateManyMutationInput, WaKeyUncheckedUpdateManyInput>
    /**
     * Filter which WaKeys to update
     */
    where?: WaKeyWhereInput
    /**
     * Limit how many WaKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaKey upsert
   */
  export type WaKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the WaKey to update in case it exists.
     */
    where: WaKeyWhereUniqueInput
    /**
     * In case the WaKey found by the `where` argument doesn't exist, create a new WaKey with this data.
     */
    create: XOR<WaKeyCreateInput, WaKeyUncheckedCreateInput>
    /**
     * In case the WaKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WaKeyUpdateInput, WaKeyUncheckedUpdateInput>
  }

  /**
   * WaKey delete
   */
  export type WaKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
    /**
     * Filter which WaKey to delete.
     */
    where: WaKeyWhereUniqueInput
  }

  /**
   * WaKey deleteMany
   */
  export type WaKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaKeys to delete
     */
    where?: WaKeyWhereInput
    /**
     * Limit how many WaKeys to delete.
     */
    limit?: number
  }

  /**
   * WaKey without action
   */
  export type WaKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaKey
     */
    select?: WaKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WaKey
     */
    omit?: WaKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaKeyInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    waMessageId: string | null
    remoteJid: string | null
    senderJid: string | null
    pushName: string | null
    fromMe: boolean | null
    type: string | null
    body: string | null
    mediaMime: string | null
    status: string | null
    error: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    waMessageId: string | null
    remoteJid: string | null
    senderJid: string | null
    pushName: string | null
    fromMe: boolean | null
    type: string | null
    body: string | null
    mediaMime: string | null
    status: string | null
    error: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    sessionId: number
    waMessageId: number
    remoteJid: number
    senderJid: number
    pushName: number
    fromMe: number
    type: number
    body: number
    mediaMime: number
    status: number
    error: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    sessionId?: true
    waMessageId?: true
    remoteJid?: true
    senderJid?: true
    pushName?: true
    fromMe?: true
    type?: true
    body?: true
    mediaMime?: true
    status?: true
    error?: true
    timestamp?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    sessionId?: true
    waMessageId?: true
    remoteJid?: true
    senderJid?: true
    pushName?: true
    fromMe?: true
    type?: true
    body?: true
    mediaMime?: true
    status?: true
    error?: true
    timestamp?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    sessionId?: true
    waMessageId?: true
    remoteJid?: true
    senderJid?: true
    pushName?: true
    fromMe?: true
    type?: true
    body?: true
    mediaMime?: true
    status?: true
    error?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    sessionId: string
    waMessageId: string | null
    remoteJid: string
    senderJid: string | null
    pushName: string | null
    fromMe: boolean
    type: string
    body: string | null
    mediaMime: string | null
    status: string
    error: string | null
    timestamp: Date
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    waMessageId?: boolean
    remoteJid?: boolean
    senderJid?: boolean
    pushName?: boolean
    fromMe?: boolean
    type?: boolean
    body?: boolean
    mediaMime?: boolean
    status?: boolean
    error?: boolean
    timestamp?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    waMessageId?: boolean
    remoteJid?: boolean
    senderJid?: boolean
    pushName?: boolean
    fromMe?: boolean
    type?: boolean
    body?: boolean
    mediaMime?: boolean
    status?: boolean
    error?: boolean
    timestamp?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    waMessageId?: boolean
    remoteJid?: boolean
    senderJid?: boolean
    pushName?: boolean
    fromMe?: boolean
    type?: boolean
    body?: boolean
    mediaMime?: boolean
    status?: boolean
    error?: boolean
    timestamp?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    sessionId?: boolean
    waMessageId?: boolean
    remoteJid?: boolean
    senderJid?: boolean
    pushName?: boolean
    fromMe?: boolean
    type?: boolean
    body?: boolean
    mediaMime?: boolean
    status?: boolean
    error?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "waMessageId" | "remoteJid" | "senderJid" | "pushName" | "fromMe" | "type" | "body" | "mediaMime" | "status" | "error" | "timestamp" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      waMessageId: string | null
      remoteJid: string
      senderJid: string | null
      pushName: string | null
      fromMe: boolean
      type: string
      body: string | null
      mediaMime: string | null
      status: string
      error: string | null
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly sessionId: FieldRef<"Message", 'String'>
    readonly waMessageId: FieldRef<"Message", 'String'>
    readonly remoteJid: FieldRef<"Message", 'String'>
    readonly senderJid: FieldRef<"Message", 'String'>
    readonly pushName: FieldRef<"Message", 'String'>
    readonly fromMe: FieldRef<"Message", 'Boolean'>
    readonly type: FieldRef<"Message", 'String'>
    readonly body: FieldRef<"Message", 'String'>
    readonly mediaMime: FieldRef<"Message", 'String'>
    readonly status: FieldRef<"Message", 'String'>
    readonly error: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'DateTime'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model BotRule
   */

  export type AggregateBotRule = {
    _count: BotRuleCountAggregateOutputType | null
    _avg: BotRuleAvgAggregateOutputType | null
    _sum: BotRuleSumAggregateOutputType | null
    _min: BotRuleMinAggregateOutputType | null
    _max: BotRuleMaxAggregateOutputType | null
  }

  export type BotRuleAvgAggregateOutputType = {
    priority: number | null
    hits: number | null
  }

  export type BotRuleSumAggregateOutputType = {
    priority: number | null
    hits: number | null
  }

  export type BotRuleMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    matchType: string | null
    keyword: string | null
    reply: string | null
    enabled: boolean | null
    priority: number | null
    hits: number | null
    createdAt: Date | null
  }

  export type BotRuleMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    matchType: string | null
    keyword: string | null
    reply: string | null
    enabled: boolean | null
    priority: number | null
    hits: number | null
    createdAt: Date | null
  }

  export type BotRuleCountAggregateOutputType = {
    id: number
    sessionId: number
    matchType: number
    keyword: number
    reply: number
    enabled: number
    priority: number
    hits: number
    createdAt: number
    _all: number
  }


  export type BotRuleAvgAggregateInputType = {
    priority?: true
    hits?: true
  }

  export type BotRuleSumAggregateInputType = {
    priority?: true
    hits?: true
  }

  export type BotRuleMinAggregateInputType = {
    id?: true
    sessionId?: true
    matchType?: true
    keyword?: true
    reply?: true
    enabled?: true
    priority?: true
    hits?: true
    createdAt?: true
  }

  export type BotRuleMaxAggregateInputType = {
    id?: true
    sessionId?: true
    matchType?: true
    keyword?: true
    reply?: true
    enabled?: true
    priority?: true
    hits?: true
    createdAt?: true
  }

  export type BotRuleCountAggregateInputType = {
    id?: true
    sessionId?: true
    matchType?: true
    keyword?: true
    reply?: true
    enabled?: true
    priority?: true
    hits?: true
    createdAt?: true
    _all?: true
  }

  export type BotRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotRule to aggregate.
     */
    where?: BotRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotRules to fetch.
     */
    orderBy?: BotRuleOrderByWithRelationInput | BotRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BotRules
    **/
    _count?: true | BotRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BotRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BotRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotRuleMaxAggregateInputType
  }

  export type GetBotRuleAggregateType<T extends BotRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateBotRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBotRule[P]>
      : GetScalarType<T[P], AggregateBotRule[P]>
  }




  export type BotRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotRuleWhereInput
    orderBy?: BotRuleOrderByWithAggregationInput | BotRuleOrderByWithAggregationInput[]
    by: BotRuleScalarFieldEnum[] | BotRuleScalarFieldEnum
    having?: BotRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotRuleCountAggregateInputType | true
    _avg?: BotRuleAvgAggregateInputType
    _sum?: BotRuleSumAggregateInputType
    _min?: BotRuleMinAggregateInputType
    _max?: BotRuleMaxAggregateInputType
  }

  export type BotRuleGroupByOutputType = {
    id: string
    sessionId: string
    matchType: string
    keyword: string
    reply: string
    enabled: boolean
    priority: number
    hits: number
    createdAt: Date
    _count: BotRuleCountAggregateOutputType | null
    _avg: BotRuleAvgAggregateOutputType | null
    _sum: BotRuleSumAggregateOutputType | null
    _min: BotRuleMinAggregateOutputType | null
    _max: BotRuleMaxAggregateOutputType | null
  }

  type GetBotRuleGroupByPayload<T extends BotRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotRuleGroupByOutputType[P]>
            : GetScalarType<T[P], BotRuleGroupByOutputType[P]>
        }
      >
    >


  export type BotRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    matchType?: boolean
    keyword?: boolean
    reply?: boolean
    enabled?: boolean
    priority?: boolean
    hits?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botRule"]>

  export type BotRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    matchType?: boolean
    keyword?: boolean
    reply?: boolean
    enabled?: boolean
    priority?: boolean
    hits?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botRule"]>

  export type BotRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    matchType?: boolean
    keyword?: boolean
    reply?: boolean
    enabled?: boolean
    priority?: boolean
    hits?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botRule"]>

  export type BotRuleSelectScalar = {
    id?: boolean
    sessionId?: boolean
    matchType?: boolean
    keyword?: boolean
    reply?: boolean
    enabled?: boolean
    priority?: boolean
    hits?: boolean
    createdAt?: boolean
  }

  export type BotRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "matchType" | "keyword" | "reply" | "enabled" | "priority" | "hits" | "createdAt", ExtArgs["result"]["botRule"]>
  export type BotRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type BotRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type BotRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $BotRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BotRule"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      matchType: string
      keyword: string
      reply: string
      enabled: boolean
      priority: number
      hits: number
      createdAt: Date
    }, ExtArgs["result"]["botRule"]>
    composites: {}
  }

  type BotRuleGetPayload<S extends boolean | null | undefined | BotRuleDefaultArgs> = $Result.GetResult<Prisma.$BotRulePayload, S>

  type BotRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BotRuleCountAggregateInputType | true
    }

  export interface BotRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BotRule'], meta: { name: 'BotRule' } }
    /**
     * Find zero or one BotRule that matches the filter.
     * @param {BotRuleFindUniqueArgs} args - Arguments to find a BotRule
     * @example
     * // Get one BotRule
     * const botRule = await prisma.botRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotRuleFindUniqueArgs>(args: SelectSubset<T, BotRuleFindUniqueArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BotRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotRuleFindUniqueOrThrowArgs} args - Arguments to find a BotRule
     * @example
     * // Get one BotRule
     * const botRule = await prisma.botRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, BotRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleFindFirstArgs} args - Arguments to find a BotRule
     * @example
     * // Get one BotRule
     * const botRule = await prisma.botRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotRuleFindFirstArgs>(args?: SelectSubset<T, BotRuleFindFirstArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleFindFirstOrThrowArgs} args - Arguments to find a BotRule
     * @example
     * // Get one BotRule
     * const botRule = await prisma.botRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, BotRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BotRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BotRules
     * const botRules = await prisma.botRule.findMany()
     * 
     * // Get first 10 BotRules
     * const botRules = await prisma.botRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botRuleWithIdOnly = await prisma.botRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BotRuleFindManyArgs>(args?: SelectSubset<T, BotRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BotRule.
     * @param {BotRuleCreateArgs} args - Arguments to create a BotRule.
     * @example
     * // Create one BotRule
     * const BotRule = await prisma.botRule.create({
     *   data: {
     *     // ... data to create a BotRule
     *   }
     * })
     * 
     */
    create<T extends BotRuleCreateArgs>(args: SelectSubset<T, BotRuleCreateArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BotRules.
     * @param {BotRuleCreateManyArgs} args - Arguments to create many BotRules.
     * @example
     * // Create many BotRules
     * const botRule = await prisma.botRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotRuleCreateManyArgs>(args?: SelectSubset<T, BotRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BotRules and returns the data saved in the database.
     * @param {BotRuleCreateManyAndReturnArgs} args - Arguments to create many BotRules.
     * @example
     * // Create many BotRules
     * const botRule = await prisma.botRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BotRules and only return the `id`
     * const botRuleWithIdOnly = await prisma.botRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, BotRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BotRule.
     * @param {BotRuleDeleteArgs} args - Arguments to delete one BotRule.
     * @example
     * // Delete one BotRule
     * const BotRule = await prisma.botRule.delete({
     *   where: {
     *     // ... filter to delete one BotRule
     *   }
     * })
     * 
     */
    delete<T extends BotRuleDeleteArgs>(args: SelectSubset<T, BotRuleDeleteArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BotRule.
     * @param {BotRuleUpdateArgs} args - Arguments to update one BotRule.
     * @example
     * // Update one BotRule
     * const botRule = await prisma.botRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotRuleUpdateArgs>(args: SelectSubset<T, BotRuleUpdateArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BotRules.
     * @param {BotRuleDeleteManyArgs} args - Arguments to filter BotRules to delete.
     * @example
     * // Delete a few BotRules
     * const { count } = await prisma.botRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotRuleDeleteManyArgs>(args?: SelectSubset<T, BotRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BotRules
     * const botRule = await prisma.botRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotRuleUpdateManyArgs>(args: SelectSubset<T, BotRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotRules and returns the data updated in the database.
     * @param {BotRuleUpdateManyAndReturnArgs} args - Arguments to update many BotRules.
     * @example
     * // Update many BotRules
     * const botRule = await prisma.botRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BotRules and only return the `id`
     * const botRuleWithIdOnly = await prisma.botRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BotRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, BotRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BotRule.
     * @param {BotRuleUpsertArgs} args - Arguments to update or create a BotRule.
     * @example
     * // Update or create a BotRule
     * const botRule = await prisma.botRule.upsert({
     *   create: {
     *     // ... data to create a BotRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BotRule we want to update
     *   }
     * })
     */
    upsert<T extends BotRuleUpsertArgs>(args: SelectSubset<T, BotRuleUpsertArgs<ExtArgs>>): Prisma__BotRuleClient<$Result.GetResult<Prisma.$BotRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BotRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleCountArgs} args - Arguments to filter BotRules to count.
     * @example
     * // Count the number of BotRules
     * const count = await prisma.botRule.count({
     *   where: {
     *     // ... the filter for the BotRules we want to count
     *   }
     * })
    **/
    count<T extends BotRuleCountArgs>(
      args?: Subset<T, BotRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BotRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotRuleAggregateArgs>(args: Subset<T, BotRuleAggregateArgs>): Prisma.PrismaPromise<GetBotRuleAggregateType<T>>

    /**
     * Group by BotRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotRuleGroupByArgs['orderBy'] }
        : { orderBy?: BotRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BotRule model
   */
  readonly fields: BotRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BotRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BotRule model
   */
  interface BotRuleFieldRefs {
    readonly id: FieldRef<"BotRule", 'String'>
    readonly sessionId: FieldRef<"BotRule", 'String'>
    readonly matchType: FieldRef<"BotRule", 'String'>
    readonly keyword: FieldRef<"BotRule", 'String'>
    readonly reply: FieldRef<"BotRule", 'String'>
    readonly enabled: FieldRef<"BotRule", 'Boolean'>
    readonly priority: FieldRef<"BotRule", 'Int'>
    readonly hits: FieldRef<"BotRule", 'Int'>
    readonly createdAt: FieldRef<"BotRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BotRule findUnique
   */
  export type BotRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter, which BotRule to fetch.
     */
    where: BotRuleWhereUniqueInput
  }

  /**
   * BotRule findUniqueOrThrow
   */
  export type BotRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter, which BotRule to fetch.
     */
    where: BotRuleWhereUniqueInput
  }

  /**
   * BotRule findFirst
   */
  export type BotRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter, which BotRule to fetch.
     */
    where?: BotRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotRules to fetch.
     */
    orderBy?: BotRuleOrderByWithRelationInput | BotRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotRules.
     */
    cursor?: BotRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotRules.
     */
    distinct?: BotRuleScalarFieldEnum | BotRuleScalarFieldEnum[]
  }

  /**
   * BotRule findFirstOrThrow
   */
  export type BotRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter, which BotRule to fetch.
     */
    where?: BotRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotRules to fetch.
     */
    orderBy?: BotRuleOrderByWithRelationInput | BotRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotRules.
     */
    cursor?: BotRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotRules.
     */
    distinct?: BotRuleScalarFieldEnum | BotRuleScalarFieldEnum[]
  }

  /**
   * BotRule findMany
   */
  export type BotRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter, which BotRules to fetch.
     */
    where?: BotRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotRules to fetch.
     */
    orderBy?: BotRuleOrderByWithRelationInput | BotRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BotRules.
     */
    cursor?: BotRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotRules.
     */
    skip?: number
    distinct?: BotRuleScalarFieldEnum | BotRuleScalarFieldEnum[]
  }

  /**
   * BotRule create
   */
  export type BotRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a BotRule.
     */
    data: XOR<BotRuleCreateInput, BotRuleUncheckedCreateInput>
  }

  /**
   * BotRule createMany
   */
  export type BotRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BotRules.
     */
    data: BotRuleCreateManyInput | BotRuleCreateManyInput[]
  }

  /**
   * BotRule createManyAndReturn
   */
  export type BotRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * The data used to create many BotRules.
     */
    data: BotRuleCreateManyInput | BotRuleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BotRule update
   */
  export type BotRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a BotRule.
     */
    data: XOR<BotRuleUpdateInput, BotRuleUncheckedUpdateInput>
    /**
     * Choose, which BotRule to update.
     */
    where: BotRuleWhereUniqueInput
  }

  /**
   * BotRule updateMany
   */
  export type BotRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BotRules.
     */
    data: XOR<BotRuleUpdateManyMutationInput, BotRuleUncheckedUpdateManyInput>
    /**
     * Filter which BotRules to update
     */
    where?: BotRuleWhereInput
    /**
     * Limit how many BotRules to update.
     */
    limit?: number
  }

  /**
   * BotRule updateManyAndReturn
   */
  export type BotRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * The data used to update BotRules.
     */
    data: XOR<BotRuleUpdateManyMutationInput, BotRuleUncheckedUpdateManyInput>
    /**
     * Filter which BotRules to update
     */
    where?: BotRuleWhereInput
    /**
     * Limit how many BotRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BotRule upsert
   */
  export type BotRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the BotRule to update in case it exists.
     */
    where: BotRuleWhereUniqueInput
    /**
     * In case the BotRule found by the `where` argument doesn't exist, create a new BotRule with this data.
     */
    create: XOR<BotRuleCreateInput, BotRuleUncheckedCreateInput>
    /**
     * In case the BotRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotRuleUpdateInput, BotRuleUncheckedUpdateInput>
  }

  /**
   * BotRule delete
   */
  export type BotRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
    /**
     * Filter which BotRule to delete.
     */
    where: BotRuleWhereUniqueInput
  }

  /**
   * BotRule deleteMany
   */
  export type BotRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotRules to delete
     */
    where?: BotRuleWhereInput
    /**
     * Limit how many BotRules to delete.
     */
    limit?: number
  }

  /**
   * BotRule without action
   */
  export type BotRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotRule
     */
    select?: BotRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotRule
     */
    omit?: BotRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotRuleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    qr: 'qr',
    qrGeneratedAt: 'qrGeneratedAt',
    botEnabled: 'botEnabled',
    webhookUrl: 'webhookUrl',
    connectedJid: 'connectedJid',
    connectedPhone: 'connectedPhone',
    lastConnectedAt: 'lastConnectedAt',
    creds: 'creds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const WaKeyScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    category: 'category',
    keyId: 'keyId',
    data: 'data'
  };

  export type WaKeyScalarFieldEnum = (typeof WaKeyScalarFieldEnum)[keyof typeof WaKeyScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    waMessageId: 'waMessageId',
    remoteJid: 'remoteJid',
    senderJid: 'senderJid',
    pushName: 'pushName',
    fromMe: 'fromMe',
    type: 'type',
    body: 'body',
    mediaMime: 'mediaMime',
    status: 'status',
    error: 'error',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const BotRuleScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    matchType: 'matchType',
    keyword: 'keyword',
    reply: 'reply',
    enabled: 'enabled',
    priority: 'priority',
    hits: 'hits',
    createdAt: 'createdAt'
  };

  export type BotRuleScalarFieldEnum = (typeof BotRuleScalarFieldEnum)[keyof typeof BotRuleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    name?: StringFilter<"Session"> | string
    status?: StringFilter<"Session"> | string
    qr?: StringNullableFilter<"Session"> | string | null
    qrGeneratedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    botEnabled?: BoolFilter<"Session"> | boolean
    webhookUrl?: StringNullableFilter<"Session"> | string | null
    connectedJid?: StringNullableFilter<"Session"> | string | null
    connectedPhone?: StringNullableFilter<"Session"> | string | null
    lastConnectedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    creds?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    keys?: WaKeyListRelationFilter
    messages?: MessageListRelationFilter
    rules?: BotRuleListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    qr?: SortOrderInput | SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    botEnabled?: SortOrder
    webhookUrl?: SortOrderInput | SortOrder
    connectedJid?: SortOrderInput | SortOrder
    connectedPhone?: SortOrderInput | SortOrder
    lastConnectedAt?: SortOrderInput | SortOrder
    creds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    keys?: WaKeyOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    rules?: BotRuleOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    status?: StringFilter<"Session"> | string
    qr?: StringNullableFilter<"Session"> | string | null
    qrGeneratedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    botEnabled?: BoolFilter<"Session"> | boolean
    webhookUrl?: StringNullableFilter<"Session"> | string | null
    connectedJid?: StringNullableFilter<"Session"> | string | null
    connectedPhone?: StringNullableFilter<"Session"> | string | null
    lastConnectedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    creds?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    keys?: WaKeyListRelationFilter
    messages?: MessageListRelationFilter
    rules?: BotRuleListRelationFilter
  }, "id" | "name">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    qr?: SortOrderInput | SortOrder
    qrGeneratedAt?: SortOrderInput | SortOrder
    botEnabled?: SortOrder
    webhookUrl?: SortOrderInput | SortOrder
    connectedJid?: SortOrderInput | SortOrder
    connectedPhone?: SortOrderInput | SortOrder
    lastConnectedAt?: SortOrderInput | SortOrder
    creds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    name?: StringWithAggregatesFilter<"Session"> | string
    status?: StringWithAggregatesFilter<"Session"> | string
    qr?: StringNullableWithAggregatesFilter<"Session"> | string | null
    qrGeneratedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    botEnabled?: BoolWithAggregatesFilter<"Session"> | boolean
    webhookUrl?: StringNullableWithAggregatesFilter<"Session"> | string | null
    connectedJid?: StringNullableWithAggregatesFilter<"Session"> | string | null
    connectedPhone?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastConnectedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    creds?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type WaKeyWhereInput = {
    AND?: WaKeyWhereInput | WaKeyWhereInput[]
    OR?: WaKeyWhereInput[]
    NOT?: WaKeyWhereInput | WaKeyWhereInput[]
    id?: StringFilter<"WaKey"> | string
    sessionId?: StringFilter<"WaKey"> | string
    category?: StringFilter<"WaKey"> | string
    keyId?: StringFilter<"WaKey"> | string
    data?: StringFilter<"WaKey"> | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type WaKeyOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    category?: SortOrder
    keyId?: SortOrder
    data?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type WaKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_category_keyId?: WaKeySessionIdCategoryKeyIdCompoundUniqueInput
    AND?: WaKeyWhereInput | WaKeyWhereInput[]
    OR?: WaKeyWhereInput[]
    NOT?: WaKeyWhereInput | WaKeyWhereInput[]
    sessionId?: StringFilter<"WaKey"> | string
    category?: StringFilter<"WaKey"> | string
    keyId?: StringFilter<"WaKey"> | string
    data?: StringFilter<"WaKey"> | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id" | "sessionId_category_keyId">

  export type WaKeyOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    category?: SortOrder
    keyId?: SortOrder
    data?: SortOrder
    _count?: WaKeyCountOrderByAggregateInput
    _max?: WaKeyMaxOrderByAggregateInput
    _min?: WaKeyMinOrderByAggregateInput
  }

  export type WaKeyScalarWhereWithAggregatesInput = {
    AND?: WaKeyScalarWhereWithAggregatesInput | WaKeyScalarWhereWithAggregatesInput[]
    OR?: WaKeyScalarWhereWithAggregatesInput[]
    NOT?: WaKeyScalarWhereWithAggregatesInput | WaKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WaKey"> | string
    sessionId?: StringWithAggregatesFilter<"WaKey"> | string
    category?: StringWithAggregatesFilter<"WaKey"> | string
    keyId?: StringWithAggregatesFilter<"WaKey"> | string
    data?: StringWithAggregatesFilter<"WaKey"> | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    sessionId?: StringFilter<"Message"> | string
    waMessageId?: StringNullableFilter<"Message"> | string | null
    remoteJid?: StringFilter<"Message"> | string
    senderJid?: StringNullableFilter<"Message"> | string | null
    pushName?: StringNullableFilter<"Message"> | string | null
    fromMe?: BoolFilter<"Message"> | boolean
    type?: StringFilter<"Message"> | string
    body?: StringNullableFilter<"Message"> | string | null
    mediaMime?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    error?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    waMessageId?: SortOrderInput | SortOrder
    remoteJid?: SortOrder
    senderJid?: SortOrderInput | SortOrder
    pushName?: SortOrderInput | SortOrder
    fromMe?: SortOrder
    type?: SortOrder
    body?: SortOrderInput | SortOrder
    mediaMime?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_waMessageId?: MessageSessionIdWaMessageIdCompoundUniqueInput
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    sessionId?: StringFilter<"Message"> | string
    waMessageId?: StringNullableFilter<"Message"> | string | null
    remoteJid?: StringFilter<"Message"> | string
    senderJid?: StringNullableFilter<"Message"> | string | null
    pushName?: StringNullableFilter<"Message"> | string | null
    fromMe?: BoolFilter<"Message"> | boolean
    type?: StringFilter<"Message"> | string
    body?: StringNullableFilter<"Message"> | string | null
    mediaMime?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    error?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id" | "sessionId_waMessageId">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    waMessageId?: SortOrderInput | SortOrder
    remoteJid?: SortOrder
    senderJid?: SortOrderInput | SortOrder
    pushName?: SortOrderInput | SortOrder
    fromMe?: SortOrder
    type?: SortOrder
    body?: SortOrderInput | SortOrder
    mediaMime?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    sessionId?: StringWithAggregatesFilter<"Message"> | string
    waMessageId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    remoteJid?: StringWithAggregatesFilter<"Message"> | string
    senderJid?: StringNullableWithAggregatesFilter<"Message"> | string | null
    pushName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    fromMe?: BoolWithAggregatesFilter<"Message"> | boolean
    type?: StringWithAggregatesFilter<"Message"> | string
    body?: StringNullableWithAggregatesFilter<"Message"> | string | null
    mediaMime?: StringNullableWithAggregatesFilter<"Message"> | string | null
    status?: StringWithAggregatesFilter<"Message"> | string
    error?: StringNullableWithAggregatesFilter<"Message"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type BotRuleWhereInput = {
    AND?: BotRuleWhereInput | BotRuleWhereInput[]
    OR?: BotRuleWhereInput[]
    NOT?: BotRuleWhereInput | BotRuleWhereInput[]
    id?: StringFilter<"BotRule"> | string
    sessionId?: StringFilter<"BotRule"> | string
    matchType?: StringFilter<"BotRule"> | string
    keyword?: StringFilter<"BotRule"> | string
    reply?: StringFilter<"BotRule"> | string
    enabled?: BoolFilter<"BotRule"> | boolean
    priority?: IntFilter<"BotRule"> | number
    hits?: IntFilter<"BotRule"> | number
    createdAt?: DateTimeFilter<"BotRule"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type BotRuleOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    matchType?: SortOrder
    keyword?: SortOrder
    reply?: SortOrder
    enabled?: SortOrder
    priority?: SortOrder
    hits?: SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type BotRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BotRuleWhereInput | BotRuleWhereInput[]
    OR?: BotRuleWhereInput[]
    NOT?: BotRuleWhereInput | BotRuleWhereInput[]
    sessionId?: StringFilter<"BotRule"> | string
    matchType?: StringFilter<"BotRule"> | string
    keyword?: StringFilter<"BotRule"> | string
    reply?: StringFilter<"BotRule"> | string
    enabled?: BoolFilter<"BotRule"> | boolean
    priority?: IntFilter<"BotRule"> | number
    hits?: IntFilter<"BotRule"> | number
    createdAt?: DateTimeFilter<"BotRule"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id">

  export type BotRuleOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    matchType?: SortOrder
    keyword?: SortOrder
    reply?: SortOrder
    enabled?: SortOrder
    priority?: SortOrder
    hits?: SortOrder
    createdAt?: SortOrder
    _count?: BotRuleCountOrderByAggregateInput
    _avg?: BotRuleAvgOrderByAggregateInput
    _max?: BotRuleMaxOrderByAggregateInput
    _min?: BotRuleMinOrderByAggregateInput
    _sum?: BotRuleSumOrderByAggregateInput
  }

  export type BotRuleScalarWhereWithAggregatesInput = {
    AND?: BotRuleScalarWhereWithAggregatesInput | BotRuleScalarWhereWithAggregatesInput[]
    OR?: BotRuleScalarWhereWithAggregatesInput[]
    NOT?: BotRuleScalarWhereWithAggregatesInput | BotRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BotRule"> | string
    sessionId?: StringWithAggregatesFilter<"BotRule"> | string
    matchType?: StringWithAggregatesFilter<"BotRule"> | string
    keyword?: StringWithAggregatesFilter<"BotRule"> | string
    reply?: StringWithAggregatesFilter<"BotRule"> | string
    enabled?: BoolWithAggregatesFilter<"BotRule"> | boolean
    priority?: IntWithAggregatesFilter<"BotRule"> | number
    hits?: IntWithAggregatesFilter<"BotRule"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BotRule"> | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyCreateNestedManyWithoutSessionInput
    messages?: MessageCreateNestedManyWithoutSessionInput
    rules?: BotRuleCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyUncheckedCreateNestedManyWithoutSessionInput
    messages?: MessageUncheckedCreateNestedManyWithoutSessionInput
    rules?: BotRuleUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUpdateManyWithoutSessionNestedInput
    messages?: MessageUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUncheckedUpdateManyWithoutSessionNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaKeyCreateInput = {
    id?: string
    category: string
    keyId: string
    data: string
    session: SessionCreateNestedOneWithoutKeysInput
  }

  export type WaKeyUncheckedCreateInput = {
    id?: string
    sessionId: string
    category: string
    keyId: string
    data: string
  }

  export type WaKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    session?: SessionUpdateOneRequiredWithoutKeysNestedInput
  }

  export type WaKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type WaKeyCreateManyInput = {
    id?: string
    sessionId: string
    category: string
    keyId: string
    data: string
  }

  export type WaKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type WaKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateInput = {
    id?: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
    session: SessionCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    sessionId: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    sessionId: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleCreateInput = {
    id?: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
    session: SessionCreateNestedOneWithoutRulesInput
  }

  export type BotRuleUncheckedCreateInput = {
    id?: string
    sessionId: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
  }

  export type BotRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutRulesNestedInput
  }

  export type BotRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleCreateManyInput = {
    id?: string
    sessionId: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
  }

  export type BotRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WaKeyListRelationFilter = {
    every?: WaKeyWhereInput
    some?: WaKeyWhereInput
    none?: WaKeyWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type BotRuleListRelationFilter = {
    every?: BotRuleWhereInput
    some?: BotRuleWhereInput
    none?: BotRuleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WaKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BotRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    qr?: SortOrder
    qrGeneratedAt?: SortOrder
    botEnabled?: SortOrder
    webhookUrl?: SortOrder
    connectedJid?: SortOrder
    connectedPhone?: SortOrder
    lastConnectedAt?: SortOrder
    creds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    qr?: SortOrder
    qrGeneratedAt?: SortOrder
    botEnabled?: SortOrder
    webhookUrl?: SortOrder
    connectedJid?: SortOrder
    connectedPhone?: SortOrder
    lastConnectedAt?: SortOrder
    creds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    qr?: SortOrder
    qrGeneratedAt?: SortOrder
    botEnabled?: SortOrder
    webhookUrl?: SortOrder
    connectedJid?: SortOrder
    connectedPhone?: SortOrder
    lastConnectedAt?: SortOrder
    creds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type WaKeySessionIdCategoryKeyIdCompoundUniqueInput = {
    sessionId: string
    category: string
    keyId: string
  }

  export type WaKeyCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    category?: SortOrder
    keyId?: SortOrder
    data?: SortOrder
  }

  export type WaKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    category?: SortOrder
    keyId?: SortOrder
    data?: SortOrder
  }

  export type WaKeyMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    category?: SortOrder
    keyId?: SortOrder
    data?: SortOrder
  }

  export type MessageSessionIdWaMessageIdCompoundUniqueInput = {
    sessionId: string
    waMessageId: string
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    waMessageId?: SortOrder
    remoteJid?: SortOrder
    senderJid?: SortOrder
    pushName?: SortOrder
    fromMe?: SortOrder
    type?: SortOrder
    body?: SortOrder
    mediaMime?: SortOrder
    status?: SortOrder
    error?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    waMessageId?: SortOrder
    remoteJid?: SortOrder
    senderJid?: SortOrder
    pushName?: SortOrder
    fromMe?: SortOrder
    type?: SortOrder
    body?: SortOrder
    mediaMime?: SortOrder
    status?: SortOrder
    error?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    waMessageId?: SortOrder
    remoteJid?: SortOrder
    senderJid?: SortOrder
    pushName?: SortOrder
    fromMe?: SortOrder
    type?: SortOrder
    body?: SortOrder
    mediaMime?: SortOrder
    status?: SortOrder
    error?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BotRuleCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    matchType?: SortOrder
    keyword?: SortOrder
    reply?: SortOrder
    enabled?: SortOrder
    priority?: SortOrder
    hits?: SortOrder
    createdAt?: SortOrder
  }

  export type BotRuleAvgOrderByAggregateInput = {
    priority?: SortOrder
    hits?: SortOrder
  }

  export type BotRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    matchType?: SortOrder
    keyword?: SortOrder
    reply?: SortOrder
    enabled?: SortOrder
    priority?: SortOrder
    hits?: SortOrder
    createdAt?: SortOrder
  }

  export type BotRuleMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    matchType?: SortOrder
    keyword?: SortOrder
    reply?: SortOrder
    enabled?: SortOrder
    priority?: SortOrder
    hits?: SortOrder
    createdAt?: SortOrder
  }

  export type BotRuleSumOrderByAggregateInput = {
    priority?: SortOrder
    hits?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WaKeyCreateNestedManyWithoutSessionInput = {
    create?: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput> | WaKeyCreateWithoutSessionInput[] | WaKeyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: WaKeyCreateOrConnectWithoutSessionInput | WaKeyCreateOrConnectWithoutSessionInput[]
    createMany?: WaKeyCreateManySessionInputEnvelope
    connect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSessionInput = {
    create?: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput> | MessageCreateWithoutSessionInput[] | MessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSessionInput | MessageCreateOrConnectWithoutSessionInput[]
    createMany?: MessageCreateManySessionInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type BotRuleCreateNestedManyWithoutSessionInput = {
    create?: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput> | BotRuleCreateWithoutSessionInput[] | BotRuleUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BotRuleCreateOrConnectWithoutSessionInput | BotRuleCreateOrConnectWithoutSessionInput[]
    createMany?: BotRuleCreateManySessionInputEnvelope
    connect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
  }

  export type WaKeyUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput> | WaKeyCreateWithoutSessionInput[] | WaKeyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: WaKeyCreateOrConnectWithoutSessionInput | WaKeyCreateOrConnectWithoutSessionInput[]
    createMany?: WaKeyCreateManySessionInputEnvelope
    connect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput> | MessageCreateWithoutSessionInput[] | MessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSessionInput | MessageCreateOrConnectWithoutSessionInput[]
    createMany?: MessageCreateManySessionInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type BotRuleUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput> | BotRuleCreateWithoutSessionInput[] | BotRuleUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BotRuleCreateOrConnectWithoutSessionInput | BotRuleCreateOrConnectWithoutSessionInput[]
    createMany?: BotRuleCreateManySessionInputEnvelope
    connect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WaKeyUpdateManyWithoutSessionNestedInput = {
    create?: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput> | WaKeyCreateWithoutSessionInput[] | WaKeyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: WaKeyCreateOrConnectWithoutSessionInput | WaKeyCreateOrConnectWithoutSessionInput[]
    upsert?: WaKeyUpsertWithWhereUniqueWithoutSessionInput | WaKeyUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: WaKeyCreateManySessionInputEnvelope
    set?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    disconnect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    delete?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    connect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    update?: WaKeyUpdateWithWhereUniqueWithoutSessionInput | WaKeyUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: WaKeyUpdateManyWithWhereWithoutSessionInput | WaKeyUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: WaKeyScalarWhereInput | WaKeyScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSessionNestedInput = {
    create?: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput> | MessageCreateWithoutSessionInput[] | MessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSessionInput | MessageCreateOrConnectWithoutSessionInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSessionInput | MessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: MessageCreateManySessionInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSessionInput | MessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSessionInput | MessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type BotRuleUpdateManyWithoutSessionNestedInput = {
    create?: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput> | BotRuleCreateWithoutSessionInput[] | BotRuleUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BotRuleCreateOrConnectWithoutSessionInput | BotRuleCreateOrConnectWithoutSessionInput[]
    upsert?: BotRuleUpsertWithWhereUniqueWithoutSessionInput | BotRuleUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: BotRuleCreateManySessionInputEnvelope
    set?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    disconnect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    delete?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    connect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    update?: BotRuleUpdateWithWhereUniqueWithoutSessionInput | BotRuleUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: BotRuleUpdateManyWithWhereWithoutSessionInput | BotRuleUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: BotRuleScalarWhereInput | BotRuleScalarWhereInput[]
  }

  export type WaKeyUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput> | WaKeyCreateWithoutSessionInput[] | WaKeyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: WaKeyCreateOrConnectWithoutSessionInput | WaKeyCreateOrConnectWithoutSessionInput[]
    upsert?: WaKeyUpsertWithWhereUniqueWithoutSessionInput | WaKeyUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: WaKeyCreateManySessionInputEnvelope
    set?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    disconnect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    delete?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    connect?: WaKeyWhereUniqueInput | WaKeyWhereUniqueInput[]
    update?: WaKeyUpdateWithWhereUniqueWithoutSessionInput | WaKeyUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: WaKeyUpdateManyWithWhereWithoutSessionInput | WaKeyUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: WaKeyScalarWhereInput | WaKeyScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput> | MessageCreateWithoutSessionInput[] | MessageUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSessionInput | MessageCreateOrConnectWithoutSessionInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSessionInput | MessageUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: MessageCreateManySessionInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSessionInput | MessageUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSessionInput | MessageUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type BotRuleUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput> | BotRuleCreateWithoutSessionInput[] | BotRuleUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BotRuleCreateOrConnectWithoutSessionInput | BotRuleCreateOrConnectWithoutSessionInput[]
    upsert?: BotRuleUpsertWithWhereUniqueWithoutSessionInput | BotRuleUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: BotRuleCreateManySessionInputEnvelope
    set?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    disconnect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    delete?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    connect?: BotRuleWhereUniqueInput | BotRuleWhereUniqueInput[]
    update?: BotRuleUpdateWithWhereUniqueWithoutSessionInput | BotRuleUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: BotRuleUpdateManyWithWhereWithoutSessionInput | BotRuleUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: BotRuleScalarWhereInput | BotRuleScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutKeysInput = {
    create?: XOR<SessionCreateWithoutKeysInput, SessionUncheckedCreateWithoutKeysInput>
    connectOrCreate?: SessionCreateOrConnectWithoutKeysInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutKeysNestedInput = {
    create?: XOR<SessionCreateWithoutKeysInput, SessionUncheckedCreateWithoutKeysInput>
    connectOrCreate?: SessionCreateOrConnectWithoutKeysInput
    upsert?: SessionUpsertWithoutKeysInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutKeysInput, SessionUpdateWithoutKeysInput>, SessionUncheckedUpdateWithoutKeysInput>
  }

  export type SessionCreateNestedOneWithoutMessagesInput = {
    create?: XOR<SessionCreateWithoutMessagesInput, SessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutMessagesInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<SessionCreateWithoutMessagesInput, SessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutMessagesInput
    upsert?: SessionUpsertWithoutMessagesInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutMessagesInput, SessionUpdateWithoutMessagesInput>, SessionUncheckedUpdateWithoutMessagesInput>
  }

  export type SessionCreateNestedOneWithoutRulesInput = {
    create?: XOR<SessionCreateWithoutRulesInput, SessionUncheckedCreateWithoutRulesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRulesInput
    connect?: SessionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateOneRequiredWithoutRulesNestedInput = {
    create?: XOR<SessionCreateWithoutRulesInput, SessionUncheckedCreateWithoutRulesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRulesInput
    upsert?: SessionUpsertWithoutRulesInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRulesInput, SessionUpdateWithoutRulesInput>, SessionUncheckedUpdateWithoutRulesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WaKeyCreateWithoutSessionInput = {
    id?: string
    category: string
    keyId: string
    data: string
  }

  export type WaKeyUncheckedCreateWithoutSessionInput = {
    id?: string
    category: string
    keyId: string
    data: string
  }

  export type WaKeyCreateOrConnectWithoutSessionInput = {
    where: WaKeyWhereUniqueInput
    create: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput>
  }

  export type WaKeyCreateManySessionInputEnvelope = {
    data: WaKeyCreateManySessionInput | WaKeyCreateManySessionInput[]
  }

  export type MessageCreateWithoutSessionInput = {
    id?: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutSessionInput = {
    id?: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSessionInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput>
  }

  export type MessageCreateManySessionInputEnvelope = {
    data: MessageCreateManySessionInput | MessageCreateManySessionInput[]
  }

  export type BotRuleCreateWithoutSessionInput = {
    id?: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
  }

  export type BotRuleUncheckedCreateWithoutSessionInput = {
    id?: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
  }

  export type BotRuleCreateOrConnectWithoutSessionInput = {
    where: BotRuleWhereUniqueInput
    create: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput>
  }

  export type BotRuleCreateManySessionInputEnvelope = {
    data: BotRuleCreateManySessionInput | BotRuleCreateManySessionInput[]
  }

  export type WaKeyUpsertWithWhereUniqueWithoutSessionInput = {
    where: WaKeyWhereUniqueInput
    update: XOR<WaKeyUpdateWithoutSessionInput, WaKeyUncheckedUpdateWithoutSessionInput>
    create: XOR<WaKeyCreateWithoutSessionInput, WaKeyUncheckedCreateWithoutSessionInput>
  }

  export type WaKeyUpdateWithWhereUniqueWithoutSessionInput = {
    where: WaKeyWhereUniqueInput
    data: XOR<WaKeyUpdateWithoutSessionInput, WaKeyUncheckedUpdateWithoutSessionInput>
  }

  export type WaKeyUpdateManyWithWhereWithoutSessionInput = {
    where: WaKeyScalarWhereInput
    data: XOR<WaKeyUpdateManyMutationInput, WaKeyUncheckedUpdateManyWithoutSessionInput>
  }

  export type WaKeyScalarWhereInput = {
    AND?: WaKeyScalarWhereInput | WaKeyScalarWhereInput[]
    OR?: WaKeyScalarWhereInput[]
    NOT?: WaKeyScalarWhereInput | WaKeyScalarWhereInput[]
    id?: StringFilter<"WaKey"> | string
    sessionId?: StringFilter<"WaKey"> | string
    category?: StringFilter<"WaKey"> | string
    keyId?: StringFilter<"WaKey"> | string
    data?: StringFilter<"WaKey"> | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSessionInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSessionInput, MessageUncheckedUpdateWithoutSessionInput>
    create: XOR<MessageCreateWithoutSessionInput, MessageUncheckedCreateWithoutSessionInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSessionInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSessionInput, MessageUncheckedUpdateWithoutSessionInput>
  }

  export type MessageUpdateManyWithWhereWithoutSessionInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSessionInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    sessionId?: StringFilter<"Message"> | string
    waMessageId?: StringNullableFilter<"Message"> | string | null
    remoteJid?: StringFilter<"Message"> | string
    senderJid?: StringNullableFilter<"Message"> | string | null
    pushName?: StringNullableFilter<"Message"> | string | null
    fromMe?: BoolFilter<"Message"> | boolean
    type?: StringFilter<"Message"> | string
    body?: StringNullableFilter<"Message"> | string | null
    mediaMime?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    error?: StringNullableFilter<"Message"> | string | null
    timestamp?: DateTimeFilter<"Message"> | Date | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type BotRuleUpsertWithWhereUniqueWithoutSessionInput = {
    where: BotRuleWhereUniqueInput
    update: XOR<BotRuleUpdateWithoutSessionInput, BotRuleUncheckedUpdateWithoutSessionInput>
    create: XOR<BotRuleCreateWithoutSessionInput, BotRuleUncheckedCreateWithoutSessionInput>
  }

  export type BotRuleUpdateWithWhereUniqueWithoutSessionInput = {
    where: BotRuleWhereUniqueInput
    data: XOR<BotRuleUpdateWithoutSessionInput, BotRuleUncheckedUpdateWithoutSessionInput>
  }

  export type BotRuleUpdateManyWithWhereWithoutSessionInput = {
    where: BotRuleScalarWhereInput
    data: XOR<BotRuleUpdateManyMutationInput, BotRuleUncheckedUpdateManyWithoutSessionInput>
  }

  export type BotRuleScalarWhereInput = {
    AND?: BotRuleScalarWhereInput | BotRuleScalarWhereInput[]
    OR?: BotRuleScalarWhereInput[]
    NOT?: BotRuleScalarWhereInput | BotRuleScalarWhereInput[]
    id?: StringFilter<"BotRule"> | string
    sessionId?: StringFilter<"BotRule"> | string
    matchType?: StringFilter<"BotRule"> | string
    keyword?: StringFilter<"BotRule"> | string
    reply?: StringFilter<"BotRule"> | string
    enabled?: BoolFilter<"BotRule"> | boolean
    priority?: IntFilter<"BotRule"> | number
    hits?: IntFilter<"BotRule"> | number
    createdAt?: DateTimeFilter<"BotRule"> | Date | string
  }

  export type SessionCreateWithoutKeysInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutSessionInput
    rules?: BotRuleCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutKeysInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutSessionInput
    rules?: BotRuleUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutKeysInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutKeysInput, SessionUncheckedCreateWithoutKeysInput>
  }

  export type SessionUpsertWithoutKeysInput = {
    update: XOR<SessionUpdateWithoutKeysInput, SessionUncheckedUpdateWithoutKeysInput>
    create: XOR<SessionCreateWithoutKeysInput, SessionUncheckedCreateWithoutKeysInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutKeysInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutKeysInput, SessionUncheckedUpdateWithoutKeysInput>
  }

  export type SessionUpdateWithoutKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateWithoutMessagesInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyCreateNestedManyWithoutSessionInput
    rules?: BotRuleCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyUncheckedCreateNestedManyWithoutSessionInput
    rules?: BotRuleUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutMessagesInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutMessagesInput, SessionUncheckedCreateWithoutMessagesInput>
  }

  export type SessionUpsertWithoutMessagesInput = {
    update: XOR<SessionUpdateWithoutMessagesInput, SessionUncheckedUpdateWithoutMessagesInput>
    create: XOR<SessionCreateWithoutMessagesInput, SessionUncheckedCreateWithoutMessagesInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutMessagesInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutMessagesInput, SessionUncheckedUpdateWithoutMessagesInput>
  }

  export type SessionUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUncheckedUpdateManyWithoutSessionNestedInput
    rules?: BotRuleUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateWithoutRulesInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyCreateNestedManyWithoutSessionInput
    messages?: MessageCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutRulesInput = {
    id?: string
    name: string
    status?: string
    qr?: string | null
    qrGeneratedAt?: Date | string | null
    botEnabled?: boolean
    webhookUrl?: string | null
    connectedJid?: string | null
    connectedPhone?: string | null
    lastConnectedAt?: Date | string | null
    creds?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: WaKeyUncheckedCreateNestedManyWithoutSessionInput
    messages?: MessageUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutRulesInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRulesInput, SessionUncheckedCreateWithoutRulesInput>
  }

  export type SessionUpsertWithoutRulesInput = {
    update: XOR<SessionUpdateWithoutRulesInput, SessionUncheckedUpdateWithoutRulesInput>
    create: XOR<SessionCreateWithoutRulesInput, SessionUncheckedCreateWithoutRulesInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRulesInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRulesInput, SessionUncheckedUpdateWithoutRulesInput>
  }

  export type SessionUpdateWithoutRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUpdateManyWithoutSessionNestedInput
    messages?: MessageUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qr?: NullableStringFieldUpdateOperationsInput | string | null
    qrGeneratedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    botEnabled?: BoolFieldUpdateOperationsInput | boolean
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedJid?: NullableStringFieldUpdateOperationsInput | string | null
    connectedPhone?: NullableStringFieldUpdateOperationsInput | string | null
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creds?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: WaKeyUncheckedUpdateManyWithoutSessionNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type WaKeyCreateManySessionInput = {
    id?: string
    category: string
    keyId: string
    data: string
  }

  export type MessageCreateManySessionInput = {
    id?: string
    waMessageId?: string | null
    remoteJid: string
    senderJid?: string | null
    pushName?: string | null
    fromMe?: boolean
    type?: string
    body?: string | null
    mediaMime?: string | null
    status?: string
    error?: string | null
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type BotRuleCreateManySessionInput = {
    id?: string
    matchType?: string
    keyword: string
    reply: string
    enabled?: boolean
    priority?: number
    hits?: number
    createdAt?: Date | string
  }

  export type WaKeyUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type WaKeyUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type WaKeyUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    keyId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    waMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    remoteJid?: StringFieldUpdateOperationsInput | string
    senderJid?: NullableStringFieldUpdateOperationsInput | string | null
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaMime?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotRuleUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    reply?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    hits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}