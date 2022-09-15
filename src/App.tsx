import { OrdersProvider } from './contexts/OrderContext';
import { SiteRoutes } from './routes';
import { AuthProvider } from './contexts/AuthContext'
import { SignIn } from './pages/SignIn';

import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

export function App() {

  const { isAuthenticated } = useContext(AuthContext)

  return (
    <AuthProvider>
      <OrdersProvider>
        {/* {isAuthenticated ? <SiteRoutes /> : <SignIn />} */}
        <SiteRoutes/>
      </OrdersProvider>
    </AuthProvider>
  )
}