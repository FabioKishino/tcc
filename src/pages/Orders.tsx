import { Link } from 'react-router-dom'

import { HeaderComponent } from '../components/HeaderComponent';

import '../styles/pages/orders.css';

export function Orders () {
  return (
    <div id="orders-page">
      <HeaderComponent title="Pedidos" addButtonEnabled={true}/>
    </div>
  )
}
