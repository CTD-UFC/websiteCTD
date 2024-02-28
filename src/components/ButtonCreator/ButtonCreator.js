import React, { useState } from 'react';
import './ButtonCreator.css'; // Importe o arquivo CSS para os estilos dos botões

function ButtonCreator() {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [editingButton, setEditingButton] = useState(null);

  const createButton = (type) => {
    const newButton = {
      id: Date.now(),
      type: type
    };
    setButtons(prevButtons => [...prevButtons, newButton]);
  };

  const selectButton = (id) => {
    setSelectedButton(id);
    setEditingButton(null); // Limpa o botão em edição ao selecionar um novo botão
  };

  const deleteButton = () => {
    setButtons(prevButtons => prevButtons.filter(button => button.id !== selectedButton));
    setSelectedButton(null); // Limpa a seleção após excluir o botão
    setEditingButton(null); // Limpa o botão em edição após excluir o botão
  };

  const editButton = () => {
    setEditingButton(selectedButton);
  };

  const updateButton = (newType) => {
    setButtons(prevButtons =>
      prevButtons.map(button =>
        button.id === editingButton ? { ...button, type: newType } : button
      )
    );
    setEditingButton(null); // Limpa o botão em edição após atualizar
  };

  return (
    <div>
      <button onClick={() => createButton('primary')}>Create Primary Button</button>
      <button onClick={() => createButton('secondary')}>Create Secondary Button</button>
      <button onClick={() => createButton('danger')}>Create Danger Button</button>
      <div>
        {buttons.map(button => (
          <div key={button.id}>
            <button 
              className={`button ${button.type} ${button.id === selectedButton ? 'selected' : ''}`} 
              onClick={() => selectButton(button.id)}
            >
              {button.type} Button
            </button>
            {button.id === selectedButton && (
              <div>
                <button onClick={deleteButton}>Delete Button</button>
                <button onClick={editButton}>Edit Button</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {editingButton && (
        <div>
          <button onClick={() => updateButton('primary')}>Update to Primary</button>
          <button onClick={() => updateButton('secondary')}>Update to Secondary</button>
          <button onClick={() => updateButton('danger')}>Update to Danger</button>
        </div>
      )}
    </div>
  );
}

export default ButtonCreator;
