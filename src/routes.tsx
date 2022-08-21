import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';

export function SiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  )
}