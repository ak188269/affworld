import './App.css'
import { BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { useUser } from './provider/UserProvider'
import LandingPage from './pages/landingPage/LandingPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Toaster } from 'react-hot-toast';

function App() {
const {user } = useUser();
  return (
    <>
    <Router>
      <Toaster/>
      <Routes>
        <Route exact path="/" element={user ? <LandingPage/> : <Login/>}/>
        <Route exact path="/register" element = {<Register/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
