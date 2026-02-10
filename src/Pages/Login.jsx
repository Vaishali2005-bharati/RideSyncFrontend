import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    

    const navigate = useNavigate();

    const  submitHandler = async (e)  => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }

        const response = await axios.post(`http://localhost:5000/login`, userData);

        console.log(response.data);

        if(response.status === 200)
        {
             const data = response.data;
            localStorage.setItem('token', data.token);
            
            navigate('/need');
            
        }

    }

    return (
        <>
        <div>
            <div className="w-full color-white text-center px-8 py-5">
                <h1 className="text-3xl  font-bolder text-white rounded bg-orange-500 pb-2"> Ride Sync </h1>
            </div>
                <form>

                    <h3 className="mx-2"> Email </h3>
                <input 
                    type = "text"
                    name = "email"
                    id = "email"
                    class = "input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                    placeholder="example@gmail.com" />

                 <h3 className="mx-2"> Password </h3>
                <input 
                type = "password"
                name= "password"
                id = "password"
                 class = "input"
                 value={password}
                 className="bg-white text-black w-1/2 border rounded m-2 px-2 py-1"
                 onChange={ (e) => setPassword(e.target.value)}
                placeholder="Password" />
                <h6 className="px-5 size-sm"> Forgot Password ?</h6>

                <div className="bg-orange-500 flex flex-cols-down justify-center align-center py-2 mx-4 rounded">
                                    <button onClick = {submitHandler} className="text-center font-bold text-white"> Login </button>
                                </div>

                </form>

                <h4 className="p-5 py-1"> Don't have your  Account ? <span> <Link to = '/register'> Register here </Link></span></h4>

                
        </div>
            
        </>
    )
}

export default Login;