import React ,{useContext} from 'react'
import { Email } from '@material-ui/icons';
import { Lock } from '@material-ui/icons';
import { Navigate, NavLink } from 'react-router-dom';
import  image3 from "./images/imagelogin.jpg";
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@material-ui/icons'
import { userContext } from '../App';


const Login = () => {
    const {state , dispatch} = useContext(userContext);
    
    const navigate = useNavigate();
    const [email , setEmail]= useState("");
    const [password , setPassword]=useState("");
    const [eye , setEye] = useState(true);

    const showPassword = () =>{
        if(eye){
            setEye(false)
        }else{
            setEye(true)
        }
    }

    const loginUser =async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/signin" , {
            method : "POST",
            credentials : "include", // To overcome our token store error...
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                   email , password
            })
        });
        console.log(res);
        const data = res.json();
        console.log(data);

        if(res.status===422 || !data){
            console.log("Login Failed");
            alert("Login Failed")
        }else{
            console.log("Login Success");
            dispatch({type : "USER" , payload : true})
            alert("Login Success")
            navigate("/")
        }

    }



    return (
        <div className='main'>
       
        <div className='signup'>
        <h2>LOGIN</h2>
        <br/>
        
            <label htmlFor='email' ><Email/></label>
            <input className='inp' type="text" name='email' onChange={(e)=> setEmail(e.target.value)} value={email} placeholder='&nbsp; Email' />
            <br />
            <label htmlFor='password' ><Lock/></label>
            <input className='inp' type={eye ? "password" : "text"} name='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='&nbsp; Password' />
            <span onClick={showPassword}><Visibility/> </span>
            <br />
            <br />
            <div>
                <button disabled={email<1 || password<1} onClick={loginUser} className='regbtn'>Login</button>
            </div>
        </div>

         <div className='rightdiv'>
         
                <img className='image1' src={image3} alt="Image" />
                <br/>
                <NavLink to="/signup">Create Account </NavLink>
         </div>
        </div>
    )
}

export default Login
