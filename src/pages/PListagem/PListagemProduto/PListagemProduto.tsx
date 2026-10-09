import type { JSX } from "react";
import Pagina from "../../../components/Pagina/Pagina";
import ListagemProdutos from "../../../components/Listagem/ListagensProdutos/ListagemProdutos";

function PListagemProduto(): JSX.Element {
    return (
        <Pagina>
            <ListagemProdutos />
        </Pagina>
    );
}

export default PListagemProduto;