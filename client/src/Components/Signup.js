import React, { useState }  from 'react'
import "./CSS/Signup.css"
import Ac from "@material-ui/icons/AccountCircle"
import {  Email } from '@material-ui/icons'
import { Phone } from '@material-ui/icons'
import Bag from "@material-ui/icons/Work"
import { Lock } from '@material-ui/icons'
import { Visibility } from '@material-ui/icons'

import image1 from "./images/image2.png"
import { NavLink , useNavigate  } from 'react-router-dom'



const Signup = () => {
 const navigate = useNavigate();
const [eye , setEye] = useState(true);
const [user,setUser]=useState({
    name:"", email:"",phone:"" , work:"",password:"",cpassword:""
})

let name,value
const handleInput= (e)=>
{
    name = e.target.name;
    value = e.target.value;

    setUser({...user , [name]: value});
}

const showPassword = () =>{
    if(eye){
        setEye(false)
    }else{
        setEye(true)
    }
}


const postdata = async (e)=>{
    e.preventDefault();
    const {name, email,phone , work,password,cpassword} = user;
    const data = await fetch("http://localhost:3001/signup" , {
      method : "POST",
      headers :{
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name, email,phone,work,password,cpassword 
      })
  }).then((response)=>{
      console.log(response);
        if(response.status==200){
            alert("Registered Successfully")
            navigate("/login")
  }else{
      alert("Email Already Registered")
  }
 

  }
)
}




    return (
        <div className='main'>
            <div className='signup'>
                    <h2>REGISTER</h2>
                <br/> 
                <label htmlFor="name"><Ac/></label>
                <input className='inp' type="text" value={user.name} onChange={handleInput} name='name' placeholder='Enter your Name' />
                <br />
                <label htmlFor="email"><Email/></label>
                <input className='inp' type="text" value={user.email} onChange={handleInput} name='email' placeholder='Enter your Email' />
                <br />
                <label htmlFor="phone"><Phone/></label>
                <input className='inp' type="number" value={user.phone} onChange={handleInput} name='phone' placeholder='Enter Phone Number' />
                <br />
                <label htmlFor="work"><Bag/></label>
                <input className='inp' type="text"  value={user.work} onChange={handleInput}  name='work' placeholder='Enter your Profession' />
                <br />
                <label htmlFor="password"><Lock/></label>
                <input className='inp' type={eye ? "password" : "text"} 
                 value={user.password} onChange={handleInput}   name='password' placeholder='Password' />
                 <span onClick={showPassword}><Visibility/> </span>

                <br />
                <label htmlFor="cpassword"><Lock/></label>
                <input className='inp' type="password"  value={user.cpassword} onChange={handleInput}  name='cpassword' placeholder='Confirm Password' />
                <br />
                <br />
                <div>
                <button className='regbtn' onClick={postdata}>Register</button>
                </div>
            </div>
            <div className='rightdiv'>
                
                <img className='image1' src={image1} alt="Image" />
                <br/>
                <NavLink to="/login">Already Registered ? Login</NavLink>
                
            </div>
                
        </div>
    )
}

export default Signup
