import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { User } from './pages/User';
import { Orders } from './pages/Orders';
import { DataGathering } from './pages/DataGathering';
import { DataForecast } from './pages/DataForecast';
import { Recipes } from './pages/Recipes';

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
      </Routes>
    </BrowserRouter>
  )
}