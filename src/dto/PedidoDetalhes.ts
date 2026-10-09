import type PedidoDTO from "./PedidoDTO";
import type ItemPedidoDTO from "./ItemPedidoDTO";

export default interface PedidoDetalhesDTO {
    pedido: PedidoDTO,
    itens: ItemPedidoDTO[]
}