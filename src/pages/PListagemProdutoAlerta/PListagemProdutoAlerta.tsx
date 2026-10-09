import type { JSX } from "react";
import Pagina from "../../components/Pagina/Pagina";
import ListagemProdutosAlerta from "../../components/Listagem/ListagemProdutosAlerta/ListagemProdutosAlerta";

function PListagemProdutoAlerta(): JSX.Element {
    return (
        <Pagina>
            <ListagemProdutosAlerta />
        </Pagina>
    );
}

export default PListagemProdutoAlerta;