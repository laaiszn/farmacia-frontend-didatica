import { useState, type JSX } from "react";

const links = [
    { label: 'Home', url: '/' },
    { label: 'Clientes', url: '/lista/clientes' },
    { label: 'Produtos', url: '/lista/produtos' },
    { label: 'Estoque baixo', url: '/lista/produtos/alerta' },
    { label: 'Pedidos', url: '/lista/pedidos' },
];

function Navegacao(): JSX.Element {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className="bg-emerald-700 relative z-50">
            <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">
                <div className="flex items-center gap-2">
                    <span className="text-white text-xl font-bold">💊 Farmácia</span>
                    <nav className="hidden sm:flex items-center gap-1 ml-4">
                        {links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="text-white text-sm px-3 py-2 rounded hover:bg-white/15 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <button
                    className="sm:hidden text-white px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Menu"
                >
                    {menuAberto ? '✕ Fechar' : '☰ Menu'}
                </button>
            </div>

            {menuAberto && (
                <div className="sm:hidden bg-emerald-800 border-t border-emerald-600 px-4 pb-4 flex flex-col gap-1">
                    {links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            className="text-white text-sm px-3 py-2.5 rounded hover:bg-white/15 transition-colors"
                            onClick={() => setMenuAberto(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Navegacao;