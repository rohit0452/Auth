import React , {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./CSS/About.css"
import  Image  from './images/image2.png'
const About = () => {
    const navigate = useNavigate();
    const [user , setUser]  = useState("");

    const getAbout = async()=>{
        try{
        const data = await fetch("http://localhost:3001/aboutus" ,{       
            method : "GET" ,
            headers :{
                // Accept : "application/json",
                 "Content-Type":"application/json",
            },credentials : "include"
        } )
        const res = await data.json();
        setUser(res)
        console.log(res);

        if(res === 401){
            const error = new Error(res.error)
            throw error ; 
        }
    }   
    catch(err){
        console.log(err);
        navigate("/login");
    }
}

   useEffect(() => {
    
    getAbout();
       }
   , []) 


    return (
        <div>
           <div className='profilecard'>
            <div className='div1'>
                <div className='div11'>
                <img className='imgpp' src={Image} alt="Profile Pic" />
                <span>Change Profile</span>
                </div>
                <div className="div12">
                    <br />
                    Social Links
                    <br />
                    ____________
                    <br />
                    <a className="links"> Github   </a>
                    <br />
                    <a className="links"> Linkedin </a>
                    <br />
                    <a className="links"> Facebook </a>
                    <br />
                    <a className="links"> Instagram</a>
                   

                </div>
            </div>
            <div className='div2'>
                <div className="div21">
                    <div className='div211'>
                        <h4>{user.name}</h4>
                        <h5>{user.work}</h5>
                        <br />
                        <h6>Ratings : 1/10</h6>
                    </div>
                    <div className='div212'>
                        <button>Edit Profile</button>
                    </div>
                </div>
                <div className="div22">
                    <h6>User ID : &nbsp; {user._id}</h6>
                    <h6>Name : &nbsp; {user.name} </h6>
                    <h6>Email : {user.email}</h6>
                    <h6>Phone : {user.phone}</h6>
                    <h6>Profession : {user.work}</h6>
                </div>
            </div>
           </div>
        </div>
    )
}

export default About
