import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Crud from './Crud';
import Busqueda from './Busqueda';

function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Crud></Crud>}></Route>
      <Route path='/busqueda' element={<Busqueda></Busqueda>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
