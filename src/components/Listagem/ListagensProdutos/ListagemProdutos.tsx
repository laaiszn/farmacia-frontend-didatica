import { useEffect, useState, type JSX } from "react";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import Utilitario from "../../../utils/Ultilitario";
import Tabela, { type Coluna } from "../../Tabela/Tabela";

const colunas: Coluna<ProdutoDTO>[] = [
    { titulo: "ID", render: (p) => p.idProduto, classe: "hidden md:table-cell" },
    { titulo: "Descrição", render: (p) => <span className="font-medium">{p.descricao}</span> },
    { titulo: "Preço", render: (p) => Utilitario.formatarParaReal(Number(p.preco)) },
    {
        titulo: "Validade",
        render: (p) => (p.validade ? Utilitario.formatarData(p.validade) : "—"),
        classe: "hidden sm:table-cell",
    },
    { titulo: "Estoque", render: (p) => p.qtdEstoque },
    {
        titulo: "Situação",
        render: (p) => (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${p.emAlerta ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                {p.emAlerta ? "Estoque baixo" : "OK"}
            </span>
        ),
    },
    {
        titulo: "Ações",
        render: (p) => (
            <a
                href={`/atualizar/produto/${p.idProduto}`}
                className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all"
            >
                Atualizar
            </a>
        ),
    },
];

function ListagemProdutos(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        ProdutoRequests.obterListaDeProdutos()
            .then(setProdutos)
            .catch((error) => { console.error(error); alert("Erro ao listar os produtos."); })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <Tabela
            titulo="Produtos"
            colunas={colunas}
            dados={produtos}
            chave={(p) => p.idProduto}
            carregando={carregando}
            linkNovo={{ texto: "Novo Produto", url: "/cadastro/produto" }}
            textoBusca={(p) => p.descricao}
            placeholderBusca="Buscar produto"
        />
    );
}

export default ListagemProdutos;