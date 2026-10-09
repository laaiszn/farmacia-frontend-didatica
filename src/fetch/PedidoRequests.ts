import type PedidoDTO from "../dto/PedidoDTO";
import type PedidoDetalhesDTO from "../dto/PedidoDetalhes";
import type { ItemEnvioDTO } from "../dto/ItemPedidoDTO";
import Utilitario from "../utils/Ultilitario";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class PedidoRequests {
    private serverUrl: string;
    private endpointPedido: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointPedido = '/pedidos';
    }

    async obterListaDePedidos(): Promise<PedidoDTO[]> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointPedido}`);

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        return await respostaAPI.json();
    }

    // devolve { pedido, itens }
    async obterPedidoPorId(idVenda: number): Promise<PedidoDetalhesDTO> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointPedido}/${idVenda}`);

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        return await respostaAPI.json();
    }

    // o pedido já nasce com os itens; devolve o id do pedido criado
    async cadastrarPedido(idCliente: number, itens: ItemEnvioDTO[]): Promise<number> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointPedido}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idCliente, itens })
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        const dados = await respostaAPI.json();
        return dados.idVenda;
    }
}

export default new PedidoRequests;