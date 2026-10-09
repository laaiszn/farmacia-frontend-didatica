import { useEffect, useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoRequests from "../../fetch/ProdutoRequests";
import Utilitario from "../../utils/Ultilitario";
import Campo from "../../components/Formularios/Campos/Campos";
import CartaoFormulario from "../Formularios/CartaoFormulario/CartaoFormulario";

interface FormProdutoProps {
    idProduto?: number; // se vier, o formulário é de atualização
}

const vazio = { descricao: "", validade: "", preco: "", qtdEstoque: "", qtdMinEstoque: "" };

function FormProduto({ idProduto }: FormProdutoProps): JSX.Element {
    const navigate = useNavigate();
    const [form, setForm] = useState(vazio);
    const editando = idProduto !== undefined;

    // a API não tem GET /produtos/:id, então busca a lista e filtra
    useEffect(() => {
        if (idProduto === undefined) return;

        ProdutoRequests.obterListaDeProdutos()
            .then((lista) => {
                const produto = lista.find((p) => p.idProduto === idProduto);
                if (!produto) {
                    alert("Produto não encontrado.");
                    navigate("/lista/produtos");
                    return;
                }
                setForm({
                    descricao: produto.descricao,
                    validade: Utilitario.formatarDataParaInput(produto.validade ?? undefined),
                    preco: String(produto.preco),
                    qtdEstoque: String(produto.qtdEstoque),
                    qtdMinEstoque: String(produto.qtdMinEstoque),
                });
            })
            .catch(() => alert("Erro ao carregar o produto."));
    }, [idProduto, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dados = {
            descricao: form.descricao,
            validade: form.validade || null,
            preco: Number(form.preco),
            qtdEstoque: Number(form.qtdEstoque),
            qtdMinEstoque: Number(form.qtdMinEstoque),
        };

        try {
            if (idProduto !== undefined) {
                await ProdutoRequests.atualizarProduto(idProduto, dados);
                alert("Produto atualizado com sucesso");
            } else {
                await ProdutoRequests.cadastrarProduto(dados);
                alert("Produto cadastrado com sucesso");
            }
            navigate("/lista/produtos");
        } catch (error) {
            alert(Utilitario.mensagemDeErro(error));
        }
    };

    return (
        <CartaoFormulario
            titulo={editando ? "Atualizar Produto" : "Cadastro de Produto"}
            textoEnviar={editando ? "SALVAR ALTERAÇÕES" : "CADASTRAR PRODUTO"}
            urlVoltar="/lista/produtos"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col sm:flex-row gap-6">
                <Campo
                    rotulo="Descrição"
                    id="descricao"
                    name="descricao"
                    required
                    maxLength={120}
                    value={form.descricao}
                    onChange={handleChange}
                    placeholder="Ex: Dipirona 500mg"
                />
                <Campo
                    rotulo="Validade (opcional)"
                    id="validade"
                    name="validade"
                    type="date"
                    value={form.validade}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
                <Campo
                    rotulo="Preço (R$)"
                    id="preco"
                    name="preco"
                    type="number"
                    required
                    min={0}
                    step={0.01}
                    value={form.preco}
                    onChange={handleChange}
                    placeholder="Ex: 9.90"
                />
                <Campo
                    rotulo="Estoque"
                    id="qtdEstoque"
                    name="qtdEstoque"
                    type="number"
                    required
                    min={0}
                    value={form.qtdEstoque}
                    onChange={handleChange}
                    placeholder="Ex: 50"
                />
                <Campo
                    rotulo="Estoque mínimo"
                    id="qtdMinEstoque"
                    name="qtdMinEstoque"
                    type="number"
                    required
                    min={0}
                    value={form.qtdMinEstoque}
                    onChange={handleChange}
                    placeholder="Ex: 10"
                />
            </div>
        </CartaoFormulario>
    );
}

export default FormProduto;