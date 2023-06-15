import React, { useState } from 'react';
import SearchBar from './components/Search';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bancoDados, setBancoDados] = useState([
    { id: 1, name: 'VIAJAR', favorite: false },
    { id: 2, name: 'ESTUDAR', favorite: false },
    { id: 3, name: 'CORRER', favorite: false },
    { id: 4, name: 'TREINAR', favorite: false },
    { id: 5, name: 'PULAR', favorite: false },
    { id: 6, name: 'DEITAR', favorite: false },
    { id: 7, name: 'COMER', favorite: false },
    { id: 8, name: 'DORMIR', favorite: false },
    { id: 9, name: 'COZINHAR', favorite: false },
    { id: 10, name: 'SAIR', favorite: false }
  ]);
  const [newTask, setNewTask] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleFavorite = (id) => {
    setBancoDados((prevBancoDados) =>
      prevBancoDados.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setBancoDados((prevBancoDados) => prevBancoDados.filter((item) => item.id !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newId = bancoDados.length + 1;
      const newItem = {
        id: newId,
        name: newTask,
        favorite: false
      };
      setBancoDados([...bancoDados, newItem]);
      setNewTask('');
    }
  };

  const filteredData = bancoDados.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((favoritoA, favoritoB) => {
    if (favoritoA.favorite && !favoritoB.favorite) return -1;
    if (!favoritoA.favorite && favoritoB.favorite) return 1;
    return 0;
  });

  return (
    <div className='container'>
    <div className='containerInput'>
    <div className='btn-section'>
        <input className='btn-tarefa'
          type="text"
          placeholder="Nova Tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          x
        />
        <SearchBar onSearch={handleSearch} className="b" />
        <div className="buttonAdd">
          <button  className="btn-adicionar" onClick={handleAddTask}>Adicionar Tarefa</button>
          </div>
      </div>
      <div className='containerList'>
      <ul>
        {sortedData.map((item) => (
          <div className='containerLi'>
          <li key={item.id} className='li-item'>
            <p>{item.favorite ? item.name : item.name}</p>
            <div className='containerButton'>
              <button onClick={() => handleToggleFavorite(item.id)} className='btn-favoritar'>
                {item.favorite ? 'Desfavoritar' : 'Favoritar'}
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
            </div>
          </li>
          </div>
          
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
};

export default App;
