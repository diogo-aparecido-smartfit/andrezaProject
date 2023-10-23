import { db } from "../../util/admin";
import { Request, Response, query } from "express";

export async function listSocialMedia(req: Request, res: Response) {
  try {
    const socialMediaRef = await db.collection("socialMedia").get();

    return res.status(201).json(socialMediaRef.docs.map((doc) => doc.data()));
  } catch (error) {
    console.log("Erro ao listar as redes sociais!");
  }
}
