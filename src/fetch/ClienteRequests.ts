import type ClienteDTO from "../dto/ClienteDTO";
import type { ClienteEnvioDTO } from "../dto/ClienteDTO";
import Utilitario from "../utils/Ultilitario";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ClienteRequests {
    private serverUrl: string;
    private endpointCliente: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointCliente = '/clientes';
    }

    async obterListaDeClientes(): Promise<ClienteDTO[]> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCliente}`);

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);

        return (await respostaAPI.json()) ?? [];
    }

    async cadastrarCliente(cliente: ClienteEnvioDTO): Promise<void> {
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCliente}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        if (!respostaAPI.ok) throw await Utilitario.erroDaResposta(respostaAPI);
    }
}

export default new ClienteRequests;