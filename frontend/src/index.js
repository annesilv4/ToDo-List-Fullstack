import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importando a função App e redenderizando a mesmo no elemento html com id=root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);