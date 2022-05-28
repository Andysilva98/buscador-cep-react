import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  // FUNÇÃO FAZ REQUISIÇÃO DA API E ALTERA O ESTADO DA CONST CEP
  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("ops! erro ao buscar o cep");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1>Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FiSearch size={25} color="fff" />
        </button>
      </div>

      {/* LOGICA PARA VERIFICAR SE TEM ALGUM VALOR NO OBJETO CEP E RENDERIZAR NA TELA AS INFOS */}
      {Object.keys(cep).length > 0 && (
        <main>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
