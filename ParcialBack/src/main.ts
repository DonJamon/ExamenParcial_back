import { Application, Router } from "oak";

import { removeMonument } from "./resolvers/delete.ts";
import { availableMonuments } from "./resolvers/get.ts";
import { addMonument } from "./resolvers/post.ts";
import { updateMonument } from "./resolvers/put.ts";

const router = new Router();

router
  .post("/api/monumentos", addMonument)
  .delete("/api/monumentos/:id", removeMonument)
  .get("/api/monumentos", availableMonuments)
  .put("/api/monumentos/:id", updateMonument);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });