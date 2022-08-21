import { Link } from 'react-router-dom'

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
  return (
    <div id="home-page">
      <header className="home-header">
        <button>
          <Link to="/home">
            <User size={64} weight="bold" color="black"/>
          </Link>
        </button> 
        
        <button>
          <Link to="/">
            <SignOut size={64} weight="bold" color="black"/>
          </Link>
        </button>        
      </header>


      <div className="home-content">
        <div className="menu-button">
          <Link to="/pratos">
            <p>Cardápio</p>
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
          <Link to="/">
            <p>Coleta de Dados</p>
            <Database size={80} weight="bold" color="black"/>
          </Link>
        </div>

        <div className="data-gathering-button">
          <Link to="/">
            <p>Previsão de Dados</p>
            <Graph size={80} weight="bold" color="black"/>
          </Link>
        </div>
        

      </div>
    </div>
  )
}
