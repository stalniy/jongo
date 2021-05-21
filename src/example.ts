
import { Entity, PropertyValueType } from "./Entity";
import { jsonSchema } from "./jsonSchema";
import { Where } from "./Where";
import { ChangeSet } from "./ChangeSet";
import { ObjectId } from "mongodb"

const schema = jsonSchema({
  type: "object",
  required: ["_id", "firstName", "lastName", "age"],
  properties: {
    _id: {
      type: "string",
      format: "object-id",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string"
    },
    age: {
      type: "number"
    },
    address: {
      type: "object",
      required: ["city", "index"],
      properties: {
        city: { type: "string" },
        country: { type: "string" },
        index: { type: "number" }
      },
    },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" }
        },
      }
    }
  },
} as const);

const being = jsonSchema({
  type: "object",
  required: ["_id", "name", "type"],
  properties: {
    _id: {
      type: "string",
      format: "object-id",
    },
    name: {
      type: "string",
    },
    lastName: {
      type: "string"
    },
    age: {
      type: "number"
    },
  },
  oneOf: [
    {
      type: "object",
      required: ["type"],
      properties: {
        type: {
          type: "string",
          const: "dog",
        },
        wool: { type: "string" }
      },
    },
    {
      type: "object",
      required: ["type"],
      properties: {
        type: {
          type: "string",
          const: "human",
        },
        skin: { type: "string" }
      },
    },
  ],
} as const);

type s = typeof being;
type Being = PropertyValueType<s>;

const a: Being = {
  type: "human",
  name: "Taily",
  _id: new ObjectId(),
  wool: "me"
}

interface User extends Entity<typeof schema> {}


const where: Where<User> = {
  _id: new ObjectId()
}

const updates: ChangeSet<User> = {
  $inc: {

  },
  $set: {

  },
  $addToSet: {

  },
  $pop: {
    items: 1
  },
  $push: {
    items: {
      $each: [],
      $sort: {

      }
    }
  }
}
