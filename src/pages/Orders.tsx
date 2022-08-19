import { Link } from 'react-router-dom'

import { HeaderComponent } from '../components/HeaderComponent';
import { Order } from '../components/Order'

import '../styles/pages/orders.css';

export function Orders () {
  return (
    <div id="orders-page">
      <HeaderComponent title="Pedidos" addButtonEnabled={true}/>
      <Order />
    </div>
  )
}
