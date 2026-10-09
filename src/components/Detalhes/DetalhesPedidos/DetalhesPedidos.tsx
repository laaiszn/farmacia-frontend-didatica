import { useCallback, useEffect, useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import type PedidoDetalhesDTO from "../../../dto/PedidoDetalhes";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import PedidoRequests from "../../../fetch/PedidoRequests";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import ItemPedidoRequests from "../../../fetch/ItemPedidoRequests";
import Utilitario from "../../../utils/Ultilitario";

interface DetalhesPedidoProps {
    idVenda: number;
}

const estiloInput = "px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-600 focus:outline-none";

function DetalhesPedido({ idVenda }: DetalhesPedidoProps): JSX.Element {
    const navigate = useNavigate();
    const [dados, setDados] = useState<PedidoDetalhesDTO | null>(null);
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [novoProduto, setNovoProduto] = useState("");
    const [novaQtd, setNovaQtd] = useState("1");
    const [editando, setEditando] = useState<{ idProduto: number; qtd: string; preco: string } | null>(null);

    // recarrega o pedido e os produtos (o estoque muda a cada alteração)
    const carregar = useCallback(async () => {
        try {
            const [pedido, listaProdutos] = await Promise.all([
                PedidoRequests.obterPedidoPorId(idVenda),
                ProdutoRequests.obterListaDeProdutos(),
            ]);
            setDados(pedido);
            setProdutos(listaProdutos);
            setErro(null);
        } catch (error) {
            setErro(Utilitario.mensagemDeErro(error));
        }
    }, [idVenda]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const handleAdicionar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const produto = produtos.find((p) => p.idProduto === Number(novoProduto));
        if (!produto) return;

        try {
            await ItemPedidoRequests.adicionarItem(idVenda, {
                idProduto: produto.idProduto,
                qtdProduto: Number(novaQtd),
                precoUnit: Number(produto.preco),
            });
            setNovoProduto("");
            setNovaQtd("1");
            await carregar();
        } catch (error) {
            alert(`${Utilitario.mensagemDeErro(error)} Confira o estoque do produto.`);
        }
    };

    const handleSalvarEdicao = async () => {
        if (!editando) return;
        try {
            await ItemPedidoRequests.atualizarItem(idVenda, editando.idProduto, {
                qtdProduto: Number(editando.qtd),
                precoUnit: Number(editando.preco),
            });
            setEditando(null);
            await carregar();
        } catch (error) {
            alert(Utilitario.mensagemDeErro(error));
        }
    };

    const handleRemover = async (idProduto: number) => {
        if (!window.confirm("Você realmente deseja remover este item?")) return;
        try {
            await ItemPedidoRequests.removerItem(idVenda, idProduto);
            await carregar();
        } catch (error) {
            alert(Utilitario.mensagemDeErro(error));
        }
    };

    if (erro) {
        return (
            <main className="bg-gray-200 flex-1 flex items-center justify-center p-6">
                <p className="text-red-600 font-semibold">{erro}</p>
            </main>
        );
    }

    if (!dados) {
        return (
            <main className="bg-gray-200 flex-1 flex items-center justify-center p-6">
                <p className="text-slate-500 italic">Carregando...</p>
            </main>
        );
    }

    const { pedido, itens } = dados;
    const total = itens.reduce((soma, i) => soma + Number(i.qtdProduto) * Number(i.precoUnit), 0);
    const idsNoPedido = new Set(itens.map((i) => i.idProduto));
    const produtosDisponiveis = produtos.filter((p) => !idsNoPedido.has(p.idProduto) && p.qtdEstoque > 0);

    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Pedido #{pedido.idVenda}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Cliente</span>
                            <span className="text-gray-700 font-medium">{pedido.nomeCliente}</span>
                        </div>
                        <div>
                            <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Data</span>
                            <span className="text-gray-700 font-medium">
                                {new Date(pedido.dataVenda).toLocaleString("pt-BR")}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Itens do pedido</h2>
                    <div className="overflow-auto border border-slate-200 rounded-lg">
                        <table className="w-full text-sm">
                            <thead className="bg-emerald-700 text-white">
                                <tr>
                                    <th className="p-3 text-left">Produto</th>
                                    <th className="p-3 text-center">Qtd.</th>
                                    <th className="p-3 text-right">Preço unit.</th>
                                    <th className="p-3 text-right">Subtotal</th>
                                    <th className="p-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {itens.length > 0 ? itens.map((item) => {
                                    const edicao = editando?.idProduto === item.idProduto ? editando : null;
                                    return (
                                        <tr key={item.idProduto}>
                                            <td className="p-3 font-medium text-slate-700">{item.descricao}</td>
                                            <td className="p-3 text-center">
                                                {edicao ? (
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={edicao.qtd}
                                                        className={`${estiloInput} w-20`}
                                                        onChange={(e) => setEditando({ ...edicao, qtd: e.target.value })}
                                                    />
                                                ) : item.qtdProduto}
                                            </td>
                                            <td className="p-3 text-right">
                                                {edicao ? (
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        step={0.01}
                                                        value={edicao.preco}
                                                        className={`${estiloInput} w-28`}
                                                        onChange={(e) => setEditando({ ...edicao, preco: e.target.value })}
                                                    />
                                                ) : Utilitario.formatarParaReal(Number(item.precoUnit))}
                                            </td>
                                            <td className="p-3 text-right">
                                                {Utilitario.formatarParaReal(Number(item.qtdProduto) * Number(item.precoUnit))}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    {edicao ? (
                                                        <>
                                                            <button
                                                                onClick={handleSalvarEdicao}
                                                                className="bg-emerald-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-emerald-500"
                                                            >
                                                                Salvar
                                                            </button>
                                                            <button
                                                                onClick={() => setEditando(null)}
                                                                className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-300"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => setEditando({
                                                                    idProduto: item.idProduto,
                                                                    qtd: String(item.qtdProduto),
                                                                    preco: String(item.precoUnit),
                                                                })}
                                                                className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-emerald-600 hover:text-white transition-all"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemover(item.idProduto)}
                                                                className="bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition-all"
                                                            >
                                                                Remover
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                                            Nenhum item neste pedido
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-right text-lg font-bold text-slate-800 mt-4">
                        Total: {Utilitario.formatarParaReal(total)}
                    </p>
                </section>

                <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Adicionar item</h2>
                    <form onSubmit={handleAdicionar} className="flex flex-col sm:flex-row gap-3">
                        <select
                            required
                            value={novoProduto}
                            onChange={(e) => setNovoProduto(e.target.value)}
                            className={`${estiloInput} flex-1 bg-white`}
                        >
                            <option value="">Selecione o produto</option>
                            {produtosDisponiveis.map((p) => (
                                <option key={p.idProduto} value={p.idProduto}>
                                    {p.descricao} — {Utilitario.formatarParaReal(Number(p.preco))} (estoque: {p.qtdEstoque})
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min={1}
                            required
                            value={novaQtd}
                            onChange={(e) => setNovaQtd(e.target.value)}
                            className={`${estiloInput} sm:w-28`}
                        />
                        <button
                            type="submit"
                            className="bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-emerald-600 transition-all"
                        >
                            Adicionar
                        </button>
                    </form>
                </section>

                <button
                    onClick={() => navigate("/lista/pedidos")}
                    className="w-full bg-white text-slate-700 px-4 py-3 rounded-md font-bold shadow-md hover:bg-slate-100 transition-all active:scale-95"
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesPedido;