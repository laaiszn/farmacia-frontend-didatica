export default interface ClienteDTO {
    idCliente: number,
    nome: string,
    cpf: string
}

export type ClienteEnvioDTO = Omit<ClienteDTO, "idCliente">;