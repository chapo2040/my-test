import "./Style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Clientes from "./components/Clientes";
import Facturas from "./components/Facturas";
import Cuenta from "./components/Cuenta";

function App() 
{

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />          
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/facturas" element={<Facturas />} />
          <Route path="/cuenta" element={<Cuenta />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;