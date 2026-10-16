import { useState, type JSX, type ReactNode } from "react";

export interface Coluna<T> {
    titulo: string;
    render: (linha: T) => ReactNode;
    classe?: string; // ex: "hidden md:table-cell"
}

interface TabelaProps<T> {
    titulo: string;
    colunas: Coluna<T>[];
    dados: T[];
    chave: (linha: T) => string | number;
    carregando?: boolean;
    linkNovo?: { texto: string; url: string };
    textoBusca?: (linha: T) => string;
    placeholderBusca?: string;
}

const POR_PAGINA = 5;

function Tabela<T>({
    titulo,
    colunas,
    dados,
    chave,
    carregando = false,
    linkNovo,
    textoBusca,
    placeholderBusca = "Buscar",
}: TabelaProps<T>): JSX.Element {
    const [pagina, setPagina] = useState(1);
    const [busca, setBusca] = useState("");

    const termo = busca.trim().toLowerCase();
    const filtrados = textoBusca && termo
        ? dados.filter((linha) => textoBusca(linha).toLowerCase().includes(termo))
        : dados;

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const visiveis = filtrados.slice(inicio, inicio + POR_PAGINA);

    return (
        <main className="bg-gray-200 flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-6 md:py-10">
            <div className="w-full max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-6">
                <h1 className="flex-1 text-xl sm:text-2xl md:text-3xl text-center sm:text-left font-bold text-slate-800">
                    {titulo}
                </h1>
                {linkNovo && (
                    <a
                        href={linkNovo.url}
                        className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-emerald-700 rounded-md text-center text-white font-bold hover:bg-emerald-600 transition-all shadow-md active:scale-95"
                    >
                        {linkNovo.texto}
                    </a>
                )}
            </div>

            {textoBusca && (
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
                    placeholder={placeholderBusca}
                    className="w-full max-w-screen-2xl mx-auto p-3 mb-4 border-b-2 border-emerald-700 rounded-sm bg-transparent focus:outline-none"
                />
            )}

            <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full min-w-[640px] border-collapse text-xs sm:text-sm md:text-base">
                        <thead className="bg-emerald-700">
                            <tr>
                                {colunas.map((c) => (
                                    <th key={c.titulo} className={`text-white p-3 md:p-4 text-left ${c.classe ?? ""}`}>
                                        {c.titulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {visiveis.length > 0 ? (
                                visiveis.map((linha) => (
                                    <tr key={chave(linha)} className="hover:bg-slate-50 transition-colors">
                                        {colunas.map((c) => (
                                            <td key={c.titulo} className={`p-3 md:p-4 text-slate-700 ${c.classe ?? ""}`}>
                                                {c.render(linha)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={colunas.length} className="text-center p-10 text-slate-500 italic">
                                        {carregando ? "Carregando..." : "Nenhum registro encontrado"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-700">
                    <span>{filtrados.length} registro(s)</span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPagina(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                            className="px-3 py-1 border border-slate-300 rounded-md bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <span>Página {paginaAtual} de {totalPaginas}</span>
                        <button
                            type="button"
                            onClick={() => setPagina(paginaAtual + 1)}
                            disabled={paginaAtual === totalPaginas}
                            className="px-3 py-1 border border-slate-300 rounded-md bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Tabela;
