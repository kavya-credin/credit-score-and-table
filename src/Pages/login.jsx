import React from 'react'
import { useState } from 'react'
function Login() {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const handleInput = (event) => {
        console.log(formData);
        setFormData({
            emmail:"",
            password:""
        })
    }
    return (
        <form>
            <h1>Plz Login</h1>
            <input type="text" placeholder="email..." value={formData.email} >
            </input>
            <input type="password" placeholder="password..." value={formData.password}></input>
            <button type="submit" onClick={handleInput}>Login</button>
        </form>
    )
}

export default Login
