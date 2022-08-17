import { Link } from 'react-router-dom'

import '../styles/components/headerComponent.css';
import { ArrowLeft, PlusCircle } from 'phosphor-react'

interface headerProps {
  title: string;
  addButtonEnabled: boolean;
}

export function HeaderComponent (props: headerProps) {
  const addButtonEnabled = props.addButtonEnabled;

  if (!addButtonEnabled) {
    return (
      <div id="header-component">
        <header className="header-content">
          <button>
            <Link to="/SignIn">
              <ArrowLeft size={64} weight="bold" color="black"/>
            </Link>
          </button>
          <p>{props.title}</p>
        </header> 
      </div>
    )
  } else {
    return (
      <div id="header-component">
        <header className="header-content">
          <button>
            <Link to="/SignIn">
              <ArrowLeft size={64} weight="bold" color="black"/>
            </Link>
          </button>
          <p>{props.title}</p>
          <button className="plus-icon">
            <Link to="/createOrder">
              <PlusCircle size={96} weight="fill"/>
            </Link>
          </button>
        </header> 
      </div>
    )
  }
}