import React , {useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App';




const Logout = () => {
    const {state , dispatch} = useContext(userContext);
    const  navigate = useNavigate();
    
    const Logoutdata = async () =>{
       
        const data = await fetch("http://localhost:3001/logout" , {
            credentials : "include"
        })
        const res = await data.json();
            console.log(res);
        if(res===200){
            console.log("Logout") ;
            navigate("/login");
            dispatch({type: "USER" , payload : false})

        }else{
            console.log("Errror");
        }
    }
  
useEffect(()=>{
    Logoutdata();
},[])
    



    return (
        <div>
            <h1>Logout Page</h1>
        </div>
    )
}

export default Logout


// const Logout = ()=>{
//     const data = fetch("http://localhost:3001/logout").then(res => console.log(res));
    
//     return(
//         <div>
//             <h1>Herewrte</h1>
//         </div>
//     )
// }

// Logout();

// export default Logout ; 

