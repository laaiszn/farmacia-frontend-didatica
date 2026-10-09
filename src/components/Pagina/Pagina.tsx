import type { JSX, ReactNode } from "react";
import Navegacao from "../Navegação/Navegacao";
import Rodape from "../Rodape/Rodape";

function Pagina({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            {children}
            <Rodape />
        </div>
    );
}

export default Pagina;