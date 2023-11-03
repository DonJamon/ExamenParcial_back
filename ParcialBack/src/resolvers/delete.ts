import { RouterContext } from "oak/router.ts";
import { ObjectId } from "mongo";
import { monumentsCollection } from "../db/mongo.ts";
import { getQuery } from "oak/helpers.ts";

type RemoveMonumentContext = RouterContext<
  "/api/monumentos/:id",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const removeMonument = async (context: RemoveMonumentContext) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.id) {
      context.response.status = 406;
      return;
    }
    const { id } = params;
    const monument = await monumentsCollection.findOne({
      id: id,      
    });
    if (!monument) {
      context.response.status = 404;
      return;
    }
    if (!monument.available) {
      context.response.status = 403;
      return;
    }

    await monumentsCollection.deleteOne({ _id: monument._id });
    context.response.status = 200;
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};