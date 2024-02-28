import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './TitleCreator.css'; // Importe o arquivo CSS para os estilos dos títulos

function DraggableTitle({ id, type, content, color, selectTitle }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'title', id, content, color },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`title ${type}`}
      onClick={() => selectTitle(id)}
      style={{ color, opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
    </div>
  );
}

function TitleCreator() {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000'); // Cor inicial preta

  const createTitle = (type) => {
    const newTitle = {
      id: Date.now(),
      type: type,
      content: newContent,
      color: selectedColor // Adiciona a cor ao novo título
    };
    setTitles(prevTitles => [...prevTitles, newTitle]);
    setSelectedTitle(newTitle.id); // Seleciona o novo título automaticamente para edição
    setEditingTitle(newTitle.id); // Define o novo título como em edição para que o campo de entrada seja exibido imediatamente
    setNewContent(''); // Limpa o campo de entrada para o próximo título
  };

  const selectTitle = (id) => {
    setSelectedTitle(id);
    setEditingTitle(null); // Limpa o título em edição ao selecionar um título existente
    setNewContent(''); // Limpa o conteúdo do novo título ao selecionar um título existente
  };

  const deleteTitle = () => {
    setTitles(prevTitles => prevTitles.filter(title => title.id !== selectedTitle));
    setSelectedTitle(null); // Limpa a seleção após excluir o título
    setEditingTitle(null); // Limpa o título em edição após excluir o título
    setNewContent(''); // Limpa o conteúdo do novo título após excluir o título
  };

  const editTitle = () => {
    setEditingTitle(selectedTitle);
    const titleToEdit = titles.find(title => title.id === selectedTitle);
    setNewContent(titleToEdit.content);
    setSelectedColor(titleToEdit.color); // Define a cor selecionada ao editar o título
  };

  const updateTitle = (newType, newContent, newColor) => {
    setTitles(prevTitles =>
      prevTitles.map(title =>
        title.id === editingTitle ? { ...title, type: newType, content: newContent, color: newColor } : title
      )
    );
    setEditingTitle(null); // Limpa o título em edição após atualizar
    setNewContent(''); // Limpa o campo de entrada de novo conteúdo
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="overlay">
      <div className="content">
        <button onClick={() => createTitle('h1')}>Add H1 Title</button>
        <button onClick={() => createTitle('h2')}>Add H2 Title</button>
        <button onClick={() => createTitle('h3')}>Add H3 Title</button>
        <div>
          <input 
            type="color" 
            value={selectedColor} 
            onChange={handleColorChange} 
          />
        </div>
        <div>
          {titles.map(title => (
            <DraggableTitle key={title.id} id={title.id} type={title.type} content={title.content} color={title.color} selectTitle={selectTitle} />
          ))}
        </div>
        {selectedTitle && (
          <div>
            <button onClick={deleteTitle}>Delete Title</button>
            <button onClick={editTitle}>Edit Title</button>
            {editingTitle === selectedTitle && (
              <div>
                <input 
                  type="text" 
                  value={newContent}
                  placeholder="Enter title content"
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <input 
                  type="color" 
                  value={selectedColor} 
                  onChange={handleColorChange} 
                />
                <button onClick={() => updateTitle('h1', newContent, selectedColor)}>Update Title</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleCreator;
