import { useEffect, useState, type JSX } from "react";
import type { ProdutoAlertaDTO } from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import Tabela, { type Coluna } from "../../Tabela/Tabela";

const colunas: Coluna<ProdutoAlertaDTO>[] = [
    { titulo: "ID", render: (p) => p.idProduto, classe: "hidden md:table-cell" },
    { titulo: "Descrição", render: (p) => <span className="font-medium">{p.descricao}</span> },
    { titulo: "Estoque atual", render: (p) => <span className="font-bold text-red-600">{p.qtdEstoque}</span> },
    { titulo: "Estoque mínimo", render: (p) => p.qtdMinEstoque },
    {
        titulo: "Ações",
        render: (p) => (
            <a
                href={`/atualizar/produto/${p.idProduto}`}
                className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all"
            >
                Reabastecer
            </a>
        ),
    },
];

function ListagemProdutosAlerta(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoAlertaDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        ProdutoRequests.obterProdutosEmAlerta()
            .then(setProdutos)
            .catch((error) => { console.error(error); alert("Erro ao listar produtos em alerta."); })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <Tabela
            titulo="Produtos com estoque baixo"
            colunas={colunas}
            dados={produtos}
            chave={(p) => p.idProduto}
            carregando={carregando}
            textoBusca={(p) => p.descricao}
            placeholderBusca="Buscar produto"
        />
    );
}

export default ListagemProdutosAlerta;