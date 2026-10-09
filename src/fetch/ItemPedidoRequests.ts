import type { ItemEnvioDTO } from "../dto/ItemPedidoDTO";
import Utilitario from "../utils/Ultilitario";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ItemPedidoRequests {
    private serverUrl: string;
    private endpointItem: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointItem = '/itens';
    }

    async adicionarItem(idVenda: number, item: ItemEnvioDTO): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointItem}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idVenda, ...item })
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }

    async atualizarItem(
        idVenda: number,
        idProduto: number,
        campos: Partial<Pick<ItemEnvioDTO, "qtdProduto" | "precoUnit">>
    ): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointItem}/${idVenda}/${idProduto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campos)
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }

    async removerItem(idVenda: number, idProduto: number): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointItem}/${idVenda}/${idProduto}`, {
            method: 'DELETE'
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }
}

export default new ItemPedidoRequests;