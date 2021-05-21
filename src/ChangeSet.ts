import { AddToSet } from "./ChangeSet/AddToSet";
import { IncChangeSet } from "./ChangeSet/IncChangeSet";
import { PopArray } from "./ChangeSet/PopArray";
import { PullAllFromArray } from "./ChangeSet/PullAllFromArray";
import { PullFromArray } from "./ChangeSet/PullFromArray";
import { PushToArray } from "./ChangeSet/PushToArray";
import { SetChangeSet } from "./ChangeSet/SetChangeSet";
import { Entity, SchemaOf } from "./Entity";

export type ChangeSet<T extends Entity<any>> = {
  $inc?: IncChangeSet<SchemaOf<T>>
  $set?: SetChangeSet<SchemaOf<T>>
  $addToSet?: AddToSet<SchemaOf<T>>
  $pop?: PopArray<SchemaOf<T>>
  $pull?: PullFromArray<SchemaOf<T>>
  $pullAll?: PullAllFromArray<SchemaOf<T>>
  $push?: PushToArray<SchemaOf<T>>
}
