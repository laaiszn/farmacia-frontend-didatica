import type { JSX } from "react";
import Pagina from "../../../components/Pagina/Pagina";
import ListagemClientes from "../../../components/Listagem/ListagensClientes/ListagensCliente";

function PListagemCliente(): JSX.Element {
    return (
        <Pagina>
            <ListagemClientes />
        </Pagina>
    );
}

export default PListagemCliente;