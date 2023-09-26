import { ObjectId } from "mongodb";
import { Entity } from "../Entity";
import { jsonSchema } from "../jsonSchema";

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

type Being = Entity<typeof being>;

const human: Being = {
    _id: new ObjectId(),
    type: "human",
    name: "John Doe",
    skin: "white"
}

const dog: Being = {
    _id: new ObjectId(),
    type: "dog",
    name: "John Doe",
    wool: "brown"
}
