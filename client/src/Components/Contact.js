import React , {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./CSS/Contact.css"

const Contact = () => {
    const [user , setUser]  = useState({name :"" , email:"" , phone:"" , message : ""});


    const navigate = useNavigate();

    const getContact = async()=>{
        try{
        const data = await fetch("http://localhost:3001/getdata" ,{       
            method : "GET" ,
            headers :{
                // Accept : "application/json",
                 "Content-Type":"application/json",
            }, credentials : "include"
        } )
        const res = await data.json();
        
        setUser({...user , name:res.name ,email:res.email , phone:res.phone , message : " " })
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

    // POST REQUEST FOR CONTACT

    const handleInput =async (e)=>{
        const name = e.target.name ; 
        const value = e.target.value ; 
        setUser({...user , [name]:value })  ;

        console.log(user);

     
    }

    // send Message btn 

    const sendData =async (e)=>{
        e.preventDefault();
        const {name , email ,phone , message} = user ; 

        const data = await fetch("http://localhost:3001/contact" , {
            method : "POST" , 
            headers : {"Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                name , email , phone , message
            }) 
        });
        const response = await data.json();
        console.log(response);
        if(!response){
            console.log("Message Not  Sent");
        }
        else{
            console.log("Message Sent");
            alert("Message Sent Successfully")
            setUser({...user , message : " "})
        }


    }

   useEffect(() => {
    getContact();
       }
   , []) 

    return (
        <div className='contact'>
            <div className='cards'>
                <div className='card'>
                    <h4>Email</h4>
                    <h6>{user.email}</h6>
                </div>
                <div className='card'>
                    <h4>Phone</h4>
                    <h6>{user.phone}</h6>
                </div>
                <div className='card'>
                    <h4>Name</h4>
                    <h6>{user.name}</h6>
                </div>
            </div>

            <div className='box'>
                <h2>GET IN TOUCH</h2>
                <br />
                <div className='inputcards'>
                <input type="text" onChange={handleInput} name='name' className='icard' value={user.name} placeholder='Name' />
                <input type="text" onChange={handleInput} name='email' className='icard' value={user.email} placeholder='Email' />
                <input type="text" onChange={handleInput} name='phone' className='icard' value={user.phone} placeholder='Phone'/>
                </div>
                <textarea onChange={handleInput} value={user.message} className='a' name="message" id="" cols="100" rows="8" placeholder='Message'></textarea>
                <button className='sendbtn' onClick={sendData}>Send Message</button>
            </div>

        </div>
    )
}

export default Contact ;
