export default interface ItemPedidoDTO {
    idProduto: number,
    descricao: string,
    qtdProduto: number,
    precoUnit: number | string   // o Postgres devolve NUMERIC como string
}

export type ItemEnvioDTO = {
    idProduto: number,
    qtdProduto: number,
    precoUnit: number
};