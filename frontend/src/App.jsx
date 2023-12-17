import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import SignUpPage from './pages/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
