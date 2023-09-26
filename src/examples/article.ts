import { Entity } from "../Entity";
import { jsonSchema } from "../jsonSchema";

const schema = jsonSchema({
    type: "object",
    required: ["id", "title", "status"],
    properties: {
      id: { type: ["number", "string"] },
      title: { type: "string" },
      status: {
        type: ["string", 'null'],
        const: 'public'
      }
    }
} as const);

type Article = Entity<typeof schema>;
interface IArticle extends Article {}

const article: IArticle = {
    id: 1,
    title: "test",
    // ...
}
