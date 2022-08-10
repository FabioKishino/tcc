import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn } from './pages/SignIn';

export function SiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}