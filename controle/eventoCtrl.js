import Evento from "../modelo/eventos.js";

export default class EventosCtrl{

    gravar (requisicao,resposta){
        if (requisicao.method == "POST" && requisicao.is ("application/json")){
            const dados = requisicao.body;
            const artista = dados.artista;
            const preco_ingresso = dados.preco_ingresso;
            const local_evento = dados.local_evento;
            const data_evento = dados.data_evento;
            const hora_evento= dados.hora_evento;
            
            if ( artista && preco_ingresso && local_evento && data_evento && hora_evento){
                const evento = new Evento (0, artista, preco_ingresso, local_evento, data_evento, hora_evento);
                evento.incluir().then(() => {
                    resposta.status(201).json({
                         "status":true,
                         "Idevento": evento.Idevento,
                         "mensagem": "O evento foi gravado com sucesso!"
                    }) 
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao incluir o evento! " + erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Requisição Inválida! Informe todos os dados do evento."
                });
            }
        } 
        else{
            resposta.status(405).json({
               "status": false,
               "mensagem": "Requisição inválida! Consulte a documentação da API"           
            });
        } 
};
    alterar (requisicao,resposta){
        if ((requisicao.method == "PUT" || requisicao.method == "PATCH") 
            && requisicao.is("application/json")){
            const dados = requisicao.body;
            const Idevento = dados.Idevento;
            const artista = dados.artista;
            const preco_ingresso = dados.preco_ingresso;
            const local_evento = dados.local_evento;
            const data_evento = dados.data_evento;
            const hora_evento= dados.hora_evento;

            if (Idevento && artista && preco_ingresso && local_evento && data_evento && hora_evento){
                const evento = new Evento (Idevento, artista, preco_ingresso, local_evento, data_evento, hora_evento);
                evento.atualizar().then(() => {
                    resposta.status(201).json({
                         "status":true,
                         "mensagem": "O evento foi alterado com sucesso!"
                    })
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao alterar o evento! " + erro.message
                    })
                });
            }
            else{
             resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"           
            });
        }
    
      

     }
};

    excluir (requisicao,resposta){
        if (requisicao.method === "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const Idevento = dados.Idevento;
            
            if (Idevento){
                const evento = new Evento (Idevento);
                evento.excluir().then(() => {
                    resposta.status(200).json({
                         "status":true,
                         "mensagem": "Evento excluído com sucesso!"
                    })
                }).catch((erro) =>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao excluir o evento! " + erro.message
                    })
                })
            }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Informe o ID do evento que deseja excluir"           
            })
        } 
        }else{
            resposta.status(405).json({
               "status": false,
               "mensagem": "Requisição inválida! Consulte a documentação da API."           
           })
       }
};

consultar (requisicao,resposta){
    let termoBusca = requisicao.params.termoBusca;
    if (!termoBusca){
        termoBusca = "";
    }
    if (requisicao.method == "GET"){
        const evento = new Evento ();
        evento.consultar(termoBusca).then((eventos) =>{
            return resposta.status(200).json({
                "status": true,
                "listaEventos": eventos

            });
        }).catch((erro) => {
            return resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao consultar os eventos: " + erro.message
            })
        })

    }else{
        return resposta.status(405).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API"

        });
    }

};
}