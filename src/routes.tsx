import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { User } from './pages/User';
import { Orders } from './pages/Orders';
import { DataGathering } from './pages/DataGathering';
import { DataForecast } from './pages/DataForecast';
import { Recipes } from './pages/Recipes';
import { Portions } from './pages/Portions';
import { Ingredients } from './pages/Ingredients';
import { ForgotPassword } from './pages/ForgotPassword';
import { EmailConfirmation } from './pages/EmailConfirmation';
import { PasswordReset } from './pages/PasswordReset';

export function SiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/data-gathering" element={<DataGathering />} />
        <Route path="/data-forecast" element={<DataForecast />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/portions" element={<Portions />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path="/password-reset/:id_restaurant/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  )
}