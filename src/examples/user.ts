import { ObjectId } from "mongodb";
import { Entity } from "../Entity";
import { jsonSchema } from "../jsonSchema";

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
    },
} as const);

type User = Entity<typeof schema>;
const user: User = {
    _id: new ObjectId(),
    firstName: "John",
    lastName: "Doe",
    age: 18,
    address: {
        city: '1',
        index: 123
    }
    // ...
}
