export default interface ProdutoDTO {
    idProduto: number,
    descricao: string,
    validade?: string | null,
    preco: number | string,   // o Postgres devolve NUMERIC como string
    qtdEstoque: number,
    qtdMinEstoque: number,
    emAlerta?: boolean
}

export type ProdutoAlertaDTO = Pick<ProdutoDTO, "idProduto" | "descricao" | "qtdEstoque" | "qtdMinEstoque" | "emAlerta">;

export type ProdutoEnvioDTO = {
    descricao: string,
    validade: string | null,
    preco: number,
    qtdEstoque: number,
    qtdMinEstoque: number
};