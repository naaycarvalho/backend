/*import Eventos from "./modelo/eventos.js";

const evento = new Eventos("4npm",
    "Henrique e Juliano",
    parseFloat("150.00"),
    "Rancho Quarto de Milha",
    "2024-03-16 21:30:00", 
    "21:30:00"
);

// Inclui o evento
/*evento.incluir(evento)
    .then(() => {
        console.log("Evento incluído com sucesso!");
    })
    .catch((erro) => {
        console.log("Erro ao incluir o evento: " + erro);
    }); */ 

/*evento.atualizar()
 .then(() => {
 console.log('Evento Atualizado!');
    }).catch( (erro) => {
     console.log(erro.message);
 });

/*evento.excluir()
    .then(() =>{
        console.log('Evento excluído!');
    }).catch( (erro) => {
        console.log("Erro ao excluir o evento: " + erro);
 });
 

 evento.consultar("").then((listaEventos)=>{
    for (const evento of listaEventos){
        console.log(evento.toString());
    }
}).catch((erro) =>{
    console.log("Erro ao consultar os eventos: " + erro);
});*/

import express from "express";
import rotaEvento from "./Rotas/rotaEvento.js";

const app = express();
const host ='0.0.0.0'; 
const porta = 4000;

app.use(express.json());

app.use('/eventos',rotaEvento);
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})

