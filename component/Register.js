import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
const Register = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [message, setMessage] = useState('')
    const [nameReg, setNameReg] = useState('')
    const [confPassword, setConfPassword] = useState('');
    const router = useRouter();
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: nameReg,
                username: usernameReg,
                password: passwordReg,
                confPassword: confPassword
            });
            Swal.fire({
                title: 'Anda Telah Berhasil Regestrasi, Silahkan Login .',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `
            })
            router.push('/')
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.message)
            }
        }
    }

    return (
        <>
            <div className="body-login">
                <div className="container-login" id="container">
                    <div className="form-container sign-in">
                        <form onSubmit={Register}>
                            <h1>Register</h1>
                            <span>Silahkan Registrasi</span>
                            <input type="text" placeholder="Name" value={nameReg} onChange={(e) => setNameReg(e.target.value)} />
                            <input type="text" placeholder="Username" value={usernameReg} onChange={(e) => setUsernameReg(e.target.value)} />
                            <input type="password" placeholder="Password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} />
                            <input type="password" placeholder="Konfirmasi Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                            <input value='Register' type='submit' className='button-login' />
                        </form>
                    </div>
                    <div className="toggle-input-container">
                        <div className="toggle-input">
                            <div className="toggle-input-panel toggle-input-right">
                                <h1>Form Registrasi Admin Baru</h1>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Register;
