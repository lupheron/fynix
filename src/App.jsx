import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import Login from './Layouts/Auth/Login';
import Register from './Layouts/Auth/Reg';
import Home from './Pages/Home/Home';
import Admin from './Layouts/Admin/Admin';
import AuthController from './hook/AuthController';

function App() {

  return (
    <div className={css.app}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/*' element={
          <AuthController>
            <Admin />
          </AuthController>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
