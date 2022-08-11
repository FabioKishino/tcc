import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function SiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}