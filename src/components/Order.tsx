import { Link } from 'react-router-dom'

import '../styles/components/order.css';
import { Pencil } from 'phosphor-react'

interface orderProps {

}

export function Order (props: orderProps) {
  return (
    <div id="order-component">
      <div className="order-content">
        <div>
          <label>Prato</label>
          <p>Yakisoba</p>
        </div>

        <div>
          <label>Quantidade</label>
          <p>1 Porção</p>
        </div>

        <div>
          <label>Status</label>
          <p>Em andamento</p>
        </div>

        <div>
          <label>Criado há</label>
          <p>5 min</p>
        </div>
      </div>

      <div className="order-edit-btn">
        <Pencil size={64} weight="fill" />
      </div>
      
    </div>
    
  )
}