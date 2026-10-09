import { useEffect, useState, type JSX } from "react";
import type ClienteDTO from "../../../dto/ClienteDTO";
import ClienteRequests from "../../../fetch/ClienteRequests";
import Tabela, { type Coluna } from "../../../components/Tabela/Tabela";

const colunas: Coluna<ClienteDTO>[] = [
    { titulo: "ID", render: (c) => c.idCliente, classe: "hidden md:table-cell" },
    { titulo: "Nome", render: (c) => <span className="font-medium">{c.nome}</span> },
    { titulo: "CPF", render: (c) => c.cpf },
];

function ListagemClientes(): JSX.Element {
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        ClienteRequests.obterListaDeClientes()
            .then(setClientes)
            .catch((error) => { console.error(error); alert("Erro ao listar os clientes."); })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <Tabela
            titulo="Clientes"
            colunas={colunas}
            dados={clientes}
            chave={(c) => c.idCliente}
            carregando={carregando}
            linkNovo={{ texto: "Novo Cliente", url: "/cadastro/cliente" }}
            textoBusca={(c) => `${c.nome} ${c.cpf}`}
            placeholderBusca="Buscar por nome ou CPF"
        />
    );
}

export default ListagemClientes;