import { RouterContext } from "oak/router.ts";
import { MonumentSchema } from "../db/schema.ts";
import { Monument } from "../types.ts";
import { monumentsCollection } from "../db/mongo.ts";

type PostAddMonumentContext = RouterContext<
  "/api/monumentos",
  Record<string | number, string | undefined>,
  Record<string, any>
>;


export const addMonument = async (context: PostAddMonumentContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const value: Monument = await result.value;
    if (!value?.nombre|| !value?.descripcion || !value?.codigoPostal || !value?.pais) {
      context.response.status = 406;
      return;
    }

    const monument: Partial<Monument> = {
      ...value,
      ciudad: " ",
      continente: " ",
      hora: " ",
      condiciones: " ",
    };

    await monumentsCollection.insertOne(monument as MonumentSchema);
    const { _id, ...slotWithoutId } = monument as MonumentSchema;
    context.response.body = slotWithoutId;
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};