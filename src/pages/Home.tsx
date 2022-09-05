import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import '../styles/pages/home.css';

import { 
  SignOut, 
  User, 
  ClipboardText, 
  ListNumbers, 
  Fish, 
  ChartPieSlice,
  Graph,
  Database,
} from 'phosphor-react';

export function Home () {
  const { signOut } = useContext(AuthContext)
  
  return (
    <div id="home-page">
      <header className="home-header">
        <button>
          <Link to="/user">
            <User size={64} weight="bold" color="black"/>
          </Link>
        </button> 
        
        <button>
          <Link to="/" onClick={signOut}>
            <SignOut size={64} weight="bold" color="black"/>
          </Link>
        </button>
      </header>


      <div className="home-content">
        <div className="menu-button">
          <Link to="/recipes">
            <p>Receitas</p>
            <ClipboardText size={80} weight="bold" color="black"/>
          </Link>
        </div>

        <div className="order-button">
          <Link to="/orders">
            <p>Pedidos</p>
            <ListNumbers size={80} weight="bold" color="black"/>
          </Link>
        </div>
        
        <div className="ingredients-button">
          <Link to="/">
            <p>Ingredientes</p>
            <Fish size={80} weight="bold" color="black"/>
          </Link>
        </div>

        <div className="portion-button">
          <Link to="/">
            <p>Porções</p>
            <ChartPieSlice size={80} weight="bold" color="black"/>
          </Link>
        </div>
      
        <div className="colect-data-button">
          <Link to="/data-gathering">
            <p>Coleta de Dados</p>
            <Database size={80} weight="bold" color="black"/>
          </Link>
        </div>

        <div className="data-gathering-button">
          <Link to="/data-forecast">
            <p>Previsão de Dados</p>
            <Graph size={80} weight="bold" color="black"/>
          </Link>
        </div>
        

      </div>
    </div>
  )
}
