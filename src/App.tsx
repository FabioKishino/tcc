import { OrdersProvider } from './contexts/OrderContext';
import { SiteRoutes } from './routes';
import { AuthProvider } from './contexts/AuthContext'

export function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <SiteRoutes/>
      </OrdersProvider>
    </AuthProvider>
  )
}