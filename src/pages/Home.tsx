import { Link } from 'react-router-dom'

import '../styles/pages/home.css';

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { 
  SignOut, 
  ArrowsOutSimple, 
  ClipboardText, 
  ListNumbers, 
  Fish, 
  ChartPieSlice,
  Graph,
  Database,
} from 'phosphor-react';

export function Home () {

  const handle = useFullScreenHandle();

  return (
    <div id="home-page">
      <header className="home-header">
        <button>
          <Link to="/SignIn">
            <SignOut size={64} weight="bold" color="black"/>
          </Link>
        </button> 
        
        <button onClick={handle.enter}>
          <Link to="/home">
            <ArrowsOutSimple size={64} weight="bold" color="black"/>
          </Link>
        </button>        
      </header>

      <div className="home-content">
        <div className="home-content-top">
          <div className="menu-button">
            <Link to="/pratos">
              <p>Cardápio</p>
              <ClipboardText size={100} weight="bold" color="black"/>
            </Link>
          </div>

          <div className="order-button">
            <Link to="/orders">
              <p>Pedidos</p>
              <ListNumbers size={100} weight="bold" color="black"/>
            </Link>
          </div>
        </div>

        <div className="home-content-middle">
          <div className="ingredients-button">
            <Link to="/">
              <p>Ingredientes</p>
              <Fish size={100} weight="bold" color="black"/>
            </Link>
          </div>

          <div className="portion-button">
            <Link to="/">
              <p>Porções</p>
              <ChartPieSlice size={100} weight="bold" color="black"/>
            </Link>
          </div>
        </div>

        <div className="home-content-bottom">
          <div className="colect-data-button">
            <Link to="/">
              <p>Coleta de Dados</p>
              <Database size={100} weight="bold" color="black"/>
            </Link>
          </div>

          <div className="data-gathering-button">
            <Link to="/">
              <p>Previsão de Dados</p>
              <Graph size={100} weight="bold" color="black"/>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
