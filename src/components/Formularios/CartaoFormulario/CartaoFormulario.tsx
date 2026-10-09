import type { FormEvent, JSX, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface CartaoFormularioProps {
    titulo: string;
    textoEnviar: string;
    urlVoltar: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

function CartaoFormulario({ titulo, textoEnviar, urlVoltar, onSubmit, children }: CartaoFormularioProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={onSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        {titulo}
                    </h1>

                    <div className="space-y-6 sm:space-y-8">{children}</div>

                    <div className="mt-10 space-y-4">
                        <input
                            type="submit"
                            value={textoEnviar}
                            className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-emerald-600 shadow-lg transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate(urlVoltar)}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CartaoFormulario;