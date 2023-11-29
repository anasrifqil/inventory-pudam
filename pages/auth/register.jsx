import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            await
                axios

                    .post('http://localhost:1337/api/auth/local/register', {
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                    })
                    .then(response => {
                        // Handle success.
                        console.log('Well done!');
                        console.log('User profile', response.data.user);
                        console.log('User token', response.data.jwt);
                        router.push('/auth/login')
                    })
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                    });

        } catch (e) {
            console.log(e.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" onChange={e => handleChange(e)} />
                {userData.username}
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="email" onChange={e => handleChange(e)} />
                {userData.email}
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" onChange={e => handleChange(e)} />
                {userData.password}
            </label>
            <br />
            <button>Register</button>
        </form>
    )
}

export default Register;