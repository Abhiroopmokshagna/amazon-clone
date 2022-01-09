
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = e => {
        e.preventDefault();

        // firebase login stuff...

        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                navigate('/')
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    const register = e => {
        e.preventDefault();
        // firebase register stuff...
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // on successful user creation with email and password
                console.log(auth);
                if(auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to = "/">
                    <img className="login__logo" src="https://cdn.cdo.mit.edu/wp-content/uploads/sites/67/2019/11/Amazon-logo.png" alt="" />

            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value = {password} onChange = {e => setPassword(e.target.value)} />
                    <button type = 'submit' className='login__signInButton' onClick={signIn}>Sign in</button>
                </form>
                <p>By continuing, you agree to Amazon clone's Conditions of Use and Privacy Notice.</p>
                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
