import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PListagemCliente from './pages/PListagem/PListagemCliente/PListagemCliente'
import PListagemProduto from './pages/PListagem/PListagemProduto/PListagemProduto'
import PListagemProdutoAlerta from './pages/PListagemProdutoAlerta/PListagemProdutoAlerta'
import PListagemPedido from './pages/PListagem/PListagemPedido/PListagemPedido'
import Pagina from './components/Pagina/Pagina'
import FormCliente from './components/Formularios/FormCliente/FormCliente'
import FormProduto from './components/FormProduto/FormProduto'
import FormPedido from './components/Formularios/FormPedido/FormPedido'
import DetalhesPedido from './components/Detalhes/DetalhesPedidos/DetalhesPedidos'

function RotaAtualizarProduto() {
  const { idProduto } = useParams()
  const id = Number(idProduto)

  if (!Number.isInteger(id) || id < 1) {
    return <Navigate to="/lista/produtos" replace />
  }

  return (
    <Pagina>
      <FormProduto idProduto={id} />
    </Pagina>
  )
}

function RotaDetalhesPedido() {
  const { idVenda } = useParams()
  const id = Number(idVenda)

  if (!Number.isInteger(id) || id < 1) {
    return <Navigate to="/lista/pedidos" replace />
  }

  return (
    <Pagina>
      <DetalhesPedido idVenda={id} />
    </Pagina>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/lista/clientes' element={<PListagemCliente />} />
        <Route path='/lista/produtos' element={<PListagemProduto />} />
        <Route path='/lista/produtos/alerta' element={<PListagemProdutoAlerta />} />
        <Route path='/lista/pedidos' element={<PListagemPedido />} />
        <Route path='/cadastro/cliente' element={<Pagina><FormCliente /></Pagina>} />
        <Route path='/cadastro/produto' element={<Pagina><FormProduto /></Pagina>} />
        <Route path='/cadastro/pedido' element={<Pagina><FormPedido /></Pagina>} />
        <Route path='/atualizar/produto/:idProduto' element={<RotaAtualizarProduto />} />
        <Route path='/detalhes/pedido/:idVenda' element={<RotaDetalhesPedido />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App