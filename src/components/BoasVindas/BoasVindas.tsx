import type { JSX } from "react";

const atalhos = [
    { titulo: "Clientes", texto: "Listar e cadastrar clientes", url: "/lista/clientes", icone: "👤" },
    { titulo: "Produtos", texto: "Listar, cadastrar e atualizar produtos", url: "/lista/produtos", icone: "💊" },
    { titulo: "Estoque baixo", texto: "Produtos abaixo do estoque mínimo", url: "/lista/produtos/alerta", icone: "⚠️" },
    { titulo: "Pedidos", texto: "Criar pedidos e gerenciar os itens", url: "/lista/pedidos", icone: "🧾" },
];

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-gray-200 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                💊 Sistema da Farmácia
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
                Gerencie clientes, produtos, estoque e pedidos em um só lugar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
                {atalhos.map((a) => (
                    <a
                        key={a.url}
                        href={a.url}
                        className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        <span className="text-3xl">{a.icone}</span>
                        <h2 className="text-lg font-bold text-slate-800 mt-2">{a.titulo}</h2>
                        <p className="text-sm text-slate-500">{a.texto}</p>
                    </a>
                ))}
            </div>
        </main>
    );
}

export default BoasVindas;