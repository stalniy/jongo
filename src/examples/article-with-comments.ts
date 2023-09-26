import { Entity } from "../Entity";
import { jsonSchema } from "../jsonSchema";

const schema = jsonSchema({
    type: "object",
    required: ["id", "title"],
    properties: {
      id: {
        type: "string",
      },
      title: {
        type: "string",
      },
      comments: {
        type: "array",
        items: {
          type: "object",
          required: ["body", "authorId"],
          properties: {
            body: { type: "string" },
            authorId: { type: "number" }
          },
        }
      }
    },
} as const);

type Article = Entity<typeof schema>;
const article: Article = {
    id: '1',
    title: "Thing",
    comments:  [
        { body: 'Hello Prisma!', authorId: 1, },
        { body: 'TS advanced inference works', authorId: 2, },
    ]
}
