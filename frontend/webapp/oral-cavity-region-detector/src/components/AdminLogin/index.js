import {React, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {saveInfo} from '../Userinfo'
// Styles
import {Wrapper,Container, Img, Form, Border} from '../Login/Login.styles'
import  {Navbar} from "../Navbar"

const AdminLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const[message,setMessage] = useState("");
    const[isfetching, setIsFetching] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setMessage("");
        axios.post("http://localhost:5000/api/admin/auth/login",{
                email: emailRef.current.value,
                password: passwordRef.current.value 
        }).then(res=>{
            setMessage(res.data.message)
            saveInfo(res.data.username,res.data.email,"admin",0,res.data.access_token)
            navigate('/adminportal');
        }).catch(err=>{
            if(err.response) setMessage(err.response.data.message)
            else setMessage(err)
            setIsFetching(false)
        }) 

    }

    return (
    <Wrapper>
        <Navbar>
        <Link to="/">User</Link>
        </Navbar>
        <Container>
        <Img/>
        <Form>
        <Border>
        <h2>Admin</h2>
        <form id="login" onSubmit={handleSubmit}>
            <p style={{color: 'red'}}>{message}</p>
            <table>
                <tbody>
                <tr><th>Email:</th></tr>
                <tr>
                   <th> <input ref={emailRef} required type="email" maxLength={128}></input></th>
                </tr>
                <tr><th>Password:</th></tr>
                <tr>
                    <th><input ref={passwordRef} required type="password" maxLength={128}></input></th>
                </tr>
                <tr>
                    <th><button type="submit" disabled={isfetching}>Sign in</button></th>
                </tr>
                </tbody>
            </table>
        </form>
        </Border>
        </Form>
        </Container>
    </Wrapper>

  )
}

export default AdminLogin