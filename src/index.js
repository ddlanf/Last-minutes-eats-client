import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom'
import  { RecipeProvider } from './contexts/RecipeContext'
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <RecipeProvider>
             <App />
        </RecipeProvider>
    </BrowserRouter>, 
document.getElementById('root'));