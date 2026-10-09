import type { JSX } from "react";
import Pagina from "../../../components/Pagina/Pagina";
import ListagemPedidos from "../../../components/Listagem/ListagemPedido/ListagemPedido";

function PListagemPedido(): JSX.Element {
    return (
        <Pagina>
            <ListagemPedidos />
        </Pagina>
    );
}

export default PListagemPedido;