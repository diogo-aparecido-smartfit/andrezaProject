import { db } from "../../util/admin";
import { Request, Response, query } from "express";

export async function listStyles(req: Request, res: Response) {
  try {
    const stylesRef = await db.collection("styles").get();

    return res.status(201).json(stylesRef.docs.map((doc) => doc.data()));
  } catch (error) {
    console.log("Erro ao listar os estilos!");
  }
}
