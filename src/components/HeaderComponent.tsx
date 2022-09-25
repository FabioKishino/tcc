import { Link } from 'react-router-dom'

import '../styles/components/headerComponent.css';
import { ArrowLeft, Info } from 'phosphor-react'

interface headerProps {
  title: string;
  handleInfo: () => void;
}

export function HeaderComponent({ title, handleInfo }: headerProps) {
  return (
    <div id="header-component">
      <header className="header-content">
        <button className="add-btn">
          <Link to="/home">
            <ArrowLeft size={64} weight="bold" color="black" />
          </Link>
        </button>
        <p>{title}</p>
        {title == 'Coleta de Dados' ? <div className='info-box'><Info className='info-btn' weight='regular' onClick={() => handleInfo()} size={30}></Info></div> : null}
      </header>
    </div>
  )
}