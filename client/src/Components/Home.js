import React, { useState ,useEffect } from 'react'
import "./CSS/Home.css"

const Home = () => {
    const [userName , setuserName ]  = useState({name : ""});
    const [show , setShow] = useState(false)


    const getData =async () =>{
        const data = await fetch("http://localhost:3001/getdata",{
            headers : {"Content-Type" : "application/json"} ,
            credentials: "include"
        });

        const res =await data.json();
        console.log(res);
        setuserName(res)
        setShow(true);
    }

    useEffect(() => {
       getData();
    }, [])
    return (
        <div>
        <div className='abc'>  
        <h1>Welcome</h1>
        <h2>{show ? userName.name : "We are MERN developer"}</h2>
        </div>
        </div>
    )
}

export default Home
