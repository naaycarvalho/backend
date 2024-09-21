import { Router } from "express";
import EventosCtrl from "../controle/eventoCtrl.js";



const rotaEvento = Router();
const crtlEvento = new EventosCtrl();

rotaEvento.get("/",crtlEvento.consultar)
.get("/:termoBusca",crtlEvento.consultar)
.post("/",crtlEvento.gravar)
.put("/", crtlEvento.alterar)
.patch ("/",crtlEvento.alterar)
.delete("/", crtlEvento.excluir);

export default rotaEvento;