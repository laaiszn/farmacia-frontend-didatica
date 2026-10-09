import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PListagemCliente from './pages/PListagem/PListagemCliente/PListagemCliente'
import PListagemProduto from './pages/PListagem/PListagemProduto/PListagemProduto'
import PListagemProdutoAlerta from './pages/PListagemProdutoAlerta/PListagemProdutoAlerta'
import PListagemPedido from './pages/PListagem/PListagemPedido/PListagemPedido'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/lista/clientes' element={<PListagemCliente />} />
        <Route path='/lista/produtos' element={<PListagemProduto />} />
        <Route path='/lista/produtos/alerta' element={<PListagemProdutoAlerta />} />
        <Route path='/lista/pedidos' element={<PListagemPedido />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App