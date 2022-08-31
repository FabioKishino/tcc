import { OrdersProvider } from './contexts/OrderContext';
import { SiteRoutes } from './routes';

export function App() {
  return (
    <OrdersProvider>
      <SiteRoutes />
    </OrdersProvider>
  )
}