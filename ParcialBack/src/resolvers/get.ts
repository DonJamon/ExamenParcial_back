import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { monumentsCollection } from "../db/mongo.ts";
import { MonumentSchema } from "../db/schema.ts";

type GetMonumentContext = RouterContext<
  "/api/monumentos",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const availableMonuments = async (context: GetMonumentContext) => {
  try {    
      const slots = await monumentsCollection.find({}).toArray();
      context.response.body = context.response.body = slots.map((slot) => {
        const { _id, ...rest } = slot;
        return rest;
      });
    
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};