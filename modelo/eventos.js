import EventosDAO from "../DAO/EventosDAO.js"
export default class Eventos {
     //atributos privados
    #Idevento
    #artista
    #preco_ingresso
    #local_evento
    #data_evento
    #hora_evento

    constructor(Idevento,artista, preco_ingresso, local_evento, data_evento,hora_evento){
        this.#Idevento = Idevento;
        this.#artista= artista;
        this.#preco_ingresso = preco_ingresso;
        this.#local_evento = local_evento;
        this.#data_evento = data_evento;
        this.#hora_evento = hora_evento;


    }
    // métodos javascript getters e setters
    get Idevento(){
        return this.#Idevento;
    }

    set Idevento(novoEvento){
        this.#Idevento = novoEvento;
    }
    get artista(){
        return this.#artista;
    }

    set artista(novoArtista){
        this.#artista = novoArtista;
    }
    get preco_ingresso(){
        return this.#preco_ingresso;
    }

    set preco_ingresso (novoPreco_ingresso){
        this.#preco_ingresso = novoPreco_ingresso;
    }
    get local_evento(){
        return this.#local_evento;
    }

    set local_evento(novoLocal_evento){
        this.#local_evento = novoLocal_evento;
    }
    get data_evento(){
        return this.#data_evento;
    }

    set data_evento(novoData_evento){
        this.#data_evento = novoData_evento;
    }
    get hora_evento(){
        return this.#hora_evento;
    }

    set hora_evento(novoHora_evento){
        this.#hora_evento = novoHora_evento;
    }

    
    //sobrescrita do método toString()
    toString() {
         //string literals
         return `Evento: ${this.#Idevento}
Artista: ${this.#artista}
Preco ingresso: ${this.#preco_ingresso}
Local evento: ${this.#local_evento}
Data evento: ${this.#data_evento}
Hora evento: ${this.#hora_evento}
        `

    
    
    }
    async incluir(){
        const eventosDAO = new EventosDAO();
        await eventosDAO.incluir(this);
    }

    async atualizar(){
        const eventosDAO = new EventosDAO();
        await eventosDAO.atualizar(this);
    }

    async excluir(){
        const eventosDAO = new EventosDAO();
        await eventosDAO.excluir(this);
    }

    async consultar(termoBusca){
        const eventosDAO = new EventosDAO();
        return await eventosDAO.consultar(termoBusca);
    }

}
