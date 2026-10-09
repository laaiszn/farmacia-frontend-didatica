  import { useEffect, useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import type ClienteDTO from "../../../dto/ClienteDTO";
import type ProdutoDTO from "../../../dto/ProdutoDTO";
import ClienteRequests from "../../../fetch/ClienteRequests";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import PedidoRequests from "../../../fetch/PedidoRequests";
import Utilitario from "../../../utils/Ultilitario";
import CartaoFormulario from "../CartaoFormulario/CartaoFormulario";

interface ItemCarrinho {
    idProduto: number;
    descricao: string;
    qtdProduto: number;
    precoUnit: number;
}

const estiloSelect = "w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none bg-white";

function FormPedido(): JSX.Element {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [idCliente, setIdCliente] = useState("");
    const [itens, setItens] = useState<ItemCarrinho[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState("1");

    useEffect(() => {
        ClienteRequests.obterListaDeClientes().then(setClientes).catch(() => alert("Erro ao carregar clientes."));
        ProdutoRequests.obterListaDeProdutos().then(setProdutos).catch(() => alert("Erro ao carregar produtos."));
    }, []);

    const total = itens.reduce((soma, i) => soma + i.qtdProduto * i.precoUnit, 0);

    const adicionarItem = () => {
        const produto = produtos.find((p) => p.idProduto === Number(produtoSelecionado));
        const qtd = Number(quantidade);

        if (!produto || qtd < 1) {
            alert("Selecione um produto e uma quantidade válida.");
            return;
        }

        const jaNoPedido = itens.find((i) => i.idProduto === produto.idProduto)?.qtdProduto ?? 0;
        if (jaNoPedido + qtd > produto.qtdEstoque) {
            alert(`Estoque insuficiente. Disponível: ${produto.qtdEstoque}`);
            return;
        }

        setItens((prev) =>
            jaNoPedido
                ? prev.map((i) => (i.idProduto === produto.idProduto ? { ...i, qtdProduto: i.qtdProduto + qtd } : i))
                : [...prev, {
                    idProduto: produto.idProduto,
                    descricao: produto.descricao,
                    qtdProduto: qtd,
                    precoUnit: Number(produto.preco),
                }]
        );
        setProdutoSelecionado("");
        setQuantidade("1");
    };

    const removerItem = (idProduto: number) =>
        setItens((prev) => prev.filter((i) => i.idProduto !== idProduto));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (itens.length === 0) {
            alert("Adicione pelo menos um item ao pedido.");
            return;
        }

        try {
            const idVenda = await PedidoRequests.cadastrarPedido(
                Number(idCliente),
                itens.map((i) => ({ idProduto: i.idProduto, qtdProduto: i.qtdProduto, precoUnit: i.precoUnit }))
            );
            alert("Pedido cadastrado com sucesso");
            navigate(`/detalhes/pedido/${idVenda}`);
        } catch (error) {
            alert(`${Utilitario.mensagemDeErro(error)} Confira o estoque dos produtos.`);
        }
    };

    return (
        <CartaoFormulario
            titulo="Novo Pedido"
            textoEnviar="FINALIZAR PEDIDO"
            urlVoltar="/lista/pedidos"
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="cliente" className="block text-sm font-semibold text-slate-700 mb-2">Cliente</label>
                <select
                    id="cliente"
                    required
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                    className={estiloSelect}
                >
                    <option value="">Selecione o cliente</option>
                    {clientes.map((c) => (
                        <option key={c.idCliente} value={c.idCliente}>{c.nome} — {c.cpf}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="flex-[3]">
                    <label htmlFor="produto" className="block text-sm font-semibold text-slate-700 mb-2">Produto</label>
                    <select
                        id="produto"
                        value={produtoSelecionado}
                        onChange={(e) => setProdutoSelecionado(e.target.value)}
                        className={estiloSelect}
                    >
                        <option value="">Selecione o produto</option>
                        {produtos.map((p) => (
                            <option key={p.idProduto} value={p.idProduto} disabled={p.qtdEstoque === 0}>
                                {p.descricao} — {Utilitario.formatarParaReal(Number(p.preco))} (estoque: {p.qtdEstoque})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="quantidade" className="block text-sm font-semibold text-slate-700 mb-2">Qtd.</label>
                    <input
                        id="quantidade"
                        type="number"
                        min={1}
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                </div>
                <button
                    type="button"
                    onClick={adicionarItem}
                    className="bg-emerald-100 text-emerald-700 px-5 py-3 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                >
                    Adicionar
                </button>
            </div>

            <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-3 text-left">Produto</th>
                            <th className="p-3 text-center">Qtd.</th>
                            <th className="p-3 text-right">Subtotal</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {itens.length > 0 ? itens.map((i) => (
                            <tr key={i.idProduto}>
                                <td className="p-3">{i.descricao}</td>
                                <td className="p-3 text-center">{i.qtdProduto}</td>
                                <td className="p-3 text-right">{Utilitario.formatarParaReal(i.qtdProduto * i.precoUnit)}</td>
                                <td className="p-3 text-right">
                                    <button
                                        type="button"
                                        onClick={() => removerItem(i.idProduto)}
                                        className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-slate-500 italic">
                                    Nenhum item adicionado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-right text-lg font-bold text-slate-800">
                Total: {Utilitario.formatarParaReal(total)}
            </p>
        </CartaoFormulario>
    );
}

export default FormPedido;