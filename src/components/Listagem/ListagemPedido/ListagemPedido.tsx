import { useEffect, useState, type JSX } from "react";
import type PedidoDTO from "../../../dto/PedidoDTO";
import PedidoRequests from "../../../fetch/PedidoRequests";
import Tabela, { type Coluna } from "../../Tabela/Tabela";

const colunas: Coluna<PedidoDTO>[] = [
    { titulo: "Nº", render: (p) => `#${p.idVenda}` },
    { titulo: "Cliente", render: (p) => <span className="font-medium">{p.nomeCliente}</span> },
    {
        titulo: "Data",
        render: (p) => new Date(p.dataVenda).toLocaleString("pt-BR"),
        classe: "hidden sm:table-cell",
    },
    {
        titulo: "Ações",
        render: (p) => (
            <a
                href={`/detalhes/pedido/${p.idVenda}`}
                className="bg-sky-100 text-sky-700 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium hover:bg-sky-600 hover:text-white transition-all"
            >
                Detalhes
            </a>
        ),
    },
];

function ListagemPedidos(): JSX.Element {
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        PedidoRequests.obterListaDePedidos()
            .then(setPedidos)
            .catch((error) => { console.error(error); alert("Erro ao listar os pedidos."); })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <Tabela
            titulo="Pedidos"
            colunas={colunas}
            dados={pedidos}
            chave={(p) => p.idVenda}
            carregando={carregando}
            linkNovo={{ texto: "Novo Pedido", url: "/cadastro/pedido" }}
            textoBusca={(p) => `${p.idVenda} ${p.nomeCliente}`}
            placeholderBusca="Buscar por número ou cliente"
        />
    );
}

export default ListagemPedidos;