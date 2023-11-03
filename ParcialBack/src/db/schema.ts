import { ObjectId } from "mongo";
import { Monument } from "../types.ts";

export type MonumentSchema = Monument & {
  _id: ObjectId;
};