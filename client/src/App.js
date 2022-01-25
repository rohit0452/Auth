import { useReducer , createContext } from 'react';
import { Route ,Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Error from './Components/Error';
import Logout from './Components/Logout';
import { reducer , initialState } from './reducer/UseReducer';
export const userContext = createContext();

 const Boutes = () =>{
  return(

    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} /> 
    <Route path="/contact" element={<Contact/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/logout" element={<Logout/>}/>
    <Route path="*" element={<Error/>} />
  </Routes>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer , initialState);
  
  return (
    <>
  <userContext.Provider value={{state,dispatch}}>

    <Navbar/>
    <Boutes/>

  </userContext.Provider>

    </>
  );
}

export default App;
