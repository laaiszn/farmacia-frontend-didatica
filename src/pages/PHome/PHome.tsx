import type { JSX } from "react";
import Pagina from "../../components/Pagina/Pagina";
import BoasVindas from "../../components/BoasVindas/BoasVindas";

function PHome(): JSX.Element {
    return (
        <Pagina>
            <BoasVindas />
        </Pagina>
    );
}

export default PHome;