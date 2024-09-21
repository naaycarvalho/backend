import conectar from "./conexao.js";
import Eventos from "../modelo/eventos.js";


export default class EventosDAO {
    // Essa classe tem como responsabilidade gravar, alterar, excluir e consultar eventos no banco de dados

    constructor() {
        this.init(); // Inicializa o banco de dados
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS Eventos (
                Idevento INT AUTO_INCREMENT PRIMARY KEY,
                artista VARCHAR(80) NOT NULL,
                preco_ingresso DECIMAL(10,2) NOT NULL,
                local_evento VARCHAR(100) NOT NULL,
                data_evento DATETIME NOT NULL,
                hora_evento TIME NOT NULL
            );`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!", erro);
        }
    }

    async incluir(eventos) {
        if (eventos instanceof Eventos) {
            try {
                const conexao = await conectar();
                const sql = `INSERT INTO Eventos (artista, preco_ingresso, local_evento, data_evento, hora_evento)
                             VALUES (?, ?, ?, ?, ?);`;
                const parametros = [
                    eventos.artista,
                    eventos.preco_ingresso,
                    eventos.local_evento,
                    eventos.data_evento,
                    eventos.hora_evento
                ];
                await conexao.execute(sql, parametros);
                return await resultado [0].insertID;
                await global.poolConexoes.releaseConnection(conexao);
            } catch (erro) {
                console.error("Erro ao incluir evento:", erro);
            }
        }
    }

    async atualizar(eventos) {
        if (eventos instanceof Eventos) {
            try {
                const conexao = await conectar();
                const sql = `UPDATE Eventos SET 
                             artista = ?,
                             preco_ingresso = ?, 
                             local_evento = ?, 
                             data_evento = ?, 
                             hora_evento = ? 
                             WHERE Idevento = ?;`;
                const parametros = [
                    eventos.artista,
                    eventos.preco_ingresso,
                    eventos.local_evento,
                    eventos.data_evento,
                    eventos.hora_evento,
                    eventos.Idevento
                ];
                await conexao.execute(sql, parametros);
                await global.poolConexoes.releaseConnection(conexao);
            } catch (erro) {
                console.error("Erro ao atualizar evento:", erro);
            }
        }
    }

    async excluir(eventos) {
        if (eventos instanceof Eventos) {
            try {
                const conexao = await conectar();
                const sql = `DELETE FROM Eventos WHERE Idevento = ?;`;
                const parametros = [
                eventos.Idevento];
                await conexao.execute(sql, parametros);
                await global.poolConexoes.releaseConnection(conexao);
            } catch (erro) {
                console.error("Erro ao excluir evento:", erro);
            }
        }
    }

    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];
        if (termoBusca) {
            sql = `SELECT * FROM Eventos WHERE artista LIKE ? ORDER BY data_evento;`;
            parametros.push(`%${termoBusca}%`);
        } else {
            sql = `SELECT * FROM Eventos ORDER BY data_evento;`;
        }

        try {
            const conexao = await conectar();
            const [registros] = await conexao.execute(sql, parametros);
            let listaEventos = [];
            for (const registro of registros) {
                const evento = new Eventos (
                    registro.Idevento,
                    registro.artista,
                    registro.preco_ingresso,
                    registro.local_evento,
                    registro.data_evento,
                    registro.hora_evento
                );
                listaEventos.push(evento);
            }
            await global.poolConexoes.releaseConnection(conexao);
            return listaEventos;
        } catch (erro) {
            console.error("Erro ao consultar eventos:", erro);
            return [];
        }
    }
}
