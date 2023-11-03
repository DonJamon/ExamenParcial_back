import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { monumentsCollection } from "../db/mongo.ts";
import { MonumentSchema } from "../db/schema.ts";

type PutMonumentContext = RouterContext<
  "//api/monumentos/:id",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const updateMonument = async (context: PutMonumentContext) => {
  try {
    const value = await context.request.body().value;
    if (
      !value.nombre ||
      !value.descripcion ||
      !value.codigoPostal ||
      !value.ciudad ||
      !value.pais ||
      !value.continente ||
      !value.hora ||
      !value.condiciones
    ) {
      context.response.status = 406;
      return;
    }
    const { nombre, descripcion, codigoPostal, ciudad, pais, continente, hora, condiciones } = value;
    const monument = await monumentsCollection.findOne({
      nombre: nombre,
      descripcion: descripcion,
      codigoPostal: codigoPostal,
      ciudad: ciudad,
      pais: pais,
      continente: continente,
      hora: hora,
      condiciones: condiciones
    });
    if (!monument) {
      context.response.status = 404;
      return;
    }
    await monumentsCollection.updateOne(
      { _id: monument._id },
      { $set: { nombre,descripcion,codigoPostal,ciudad,pais,continente,hora,condiciones} }
    );
    context.response.status = 200;
    const { _id, ...rest } = monument;
    context.response.body = { ...rest};
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};