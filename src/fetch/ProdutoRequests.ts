import type ProdutoDTO from "../dto/ProdutoDTO";
import type { ProdutoAlertaDTO, ProdutoEnvioDTO } from "../dto/ProdutoDTO";
import Utilitario from "../utils/Ultilitario";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ProdutoRequests {
    private serverUrl: string;
    private endpointProduto: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointProduto = '/produtos';
    }

    async obterListaDeProdutos(): Promise<ProdutoDTO[]> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}`);

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        return await respostaAPI.json();
    }

    async obterProdutosEmAlerta(): Promise<ProdutoAlertaDTO[]> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}/alerta`);

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        return await respostaAPI.json();
    }

    async cadastrarProduto(produto: ProdutoEnvioDTO): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }

    async atualizarProduto(idProduto: number, campos: Partial<ProdutoEnvioDTO>): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}/${idProduto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campos)
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }
}

export default new ProdutoRequests;