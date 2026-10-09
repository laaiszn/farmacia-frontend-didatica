import { useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import ClienteRequests from "../../../fetch/ClienteRequests";
import Utilitario from "../../../utils/Ultilitario";
import Campo from "../Campos/Campos";
import CartaoFormulario from "../CartaoFormulario/CartaoFormulario";

// aplica a máscara 000.000.000-00 enquanto digita
const formatarCpf = (valor: string) =>
    valor.replace(/\D/g, "").slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

function FormCliente(): JSX.Element {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nome: "", cpf: "" });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await ClienteRequests.cadastrarCliente(form);
            alert("Cliente cadastrado com sucesso");
            navigate("/lista/clientes");
        } catch (error) {
            alert(`${Utilitario.mensagemDeErro(error)} (o CPF pode já estar cadastrado)`);
        }
    };

    return (
        <CartaoFormulario
            titulo="Cadastro de Cliente"
            textoEnviar="CADASTRAR CLIENTE"
            urlVoltar="/lista/clientes"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col sm:flex-row gap-6">
                <Campo
                    rotulo="Nome"
                    id="nome"
                    name="nome"
                    required
                    minLength={3}
                    maxLength={80}
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Digite o nome"
                />
                <Campo
                    rotulo="CPF"
                    id="cpf"
                    name="cpf"
                    required
                    minLength={14}
                    maxLength={14}
                    value={form.cpf}
                    onChange={(e) => setForm({ ...form, cpf: formatarCpf(e.target.value) })}
                    placeholder="000.000.000-00"
                />
            </div>
        </CartaoFormulario>
    );
}

export default FormCliente;