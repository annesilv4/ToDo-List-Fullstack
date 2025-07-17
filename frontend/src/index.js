import React from 'react'; // Importando React para poder usar JSX
import ReactDOM from 'react-dom/client'; // Importando ReactDOM para renderizar o componente React no DOM
import App from './App'; // Importando o componente App que contém a lógica do aplicativo

// Importando a função App e redenderizando a mesmo no elemento html com id=root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Renderizando o componente App dentro do elemento com id 'root'