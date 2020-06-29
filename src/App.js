import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const data = {
      title: `new repository ${Date.now()}`,
      url: "https://github.com/Mlfraga/Total-Clean",
      techs:
        [
          "React",
          "NodeJS",
          "ReactNative"
        ]
    }
    const response = await api.post('repositories', data)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories)
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  return (
    <div>
      <h1>Lista de Repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
