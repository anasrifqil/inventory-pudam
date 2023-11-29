import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const router = useRouter();

  // Check if username exists in localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password,
      });
      Cookies.set('token', res.data.accessToken);
      localStorage.setItem('username', username);

      router.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        Swal.fire({
          title: 'Anda Gagal Login, Silahkan Login Kembali.',
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
        });
      }
    }
  };

  return (
    <>
      <div className="body-login">
        <div className="container-login" id="container">
          <div className="form-container sign-in">
            <form onSubmit={Auth}>
              <h1>Sign in</h1>
              <span>Gunakan Username Dan Password</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input value='Login' type='submit' className='button-login' />
            </form>
          </div>
          <div className="toggle-input-container">
            <div className="toggle-input">
              <div className="toggle-input-panel toggle-input-right">
                <h1>Selamat Datang, Admin!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
