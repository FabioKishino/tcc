import { Link } from 'react-router-dom'

import '../styles/components/headerComponent.css';
import { ArrowLeft } from 'phosphor-react'

interface headerProps {
  title: string;
}

export function HeaderComponent (props: headerProps) {
  return (
    <div id="header-component">
      <header className="header-content">
        <button className="add-btn">
          <Link to="/home">
            <ArrowLeft size={64} weight="bold" color="black"/>
          </Link>
        </button>
        <p>{props.title}</p>
      </header> 
    </div>
  )
}