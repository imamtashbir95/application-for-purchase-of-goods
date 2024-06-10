import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { username, password });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                setRole(user.role);
                console.log(token);
                console.log(user.username);
                console.log(user.role);
                navigate(`/${user.role}`);
            } else {
                setError('Token tidak ditemukan');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Nama pengguna atau kata sandi tidak valid');
            } else if (error.response && error.response.status === 404) {
                setError('Data tidak ditemukan');
            } else {
                setError('Terjadi kesalahan pada server');
            }
        }
    };

    return (
        <div>
            <style>
                {`
                * {
                    box-sizing: border-box;
                }
                p {
                    color: #486A33;
                    margin-bottom: 30px;    
                    text-align: center;
                }
                form {
                    max-width: 400px;
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                }
                img {
                    max-width: 100%;
                    margin: -20.59% 0;
                }
                h2 {
                    text-align: center;
                }
                input[type="text"],
                input[type="password"] {
                    background: #486A33;
                    border-color: #486A33;
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #486A33;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    color: #A8C698;
                    font-size: 16px;
                }
                input[type="text"]::placeholder,
                input[type="password"]::placeholder {
                    color: #A8C698;
                }
                input[type="checkbox"] {
                    display: none;
                }
                label {
                    margin-bottom: 30px;
                }
                label.checkbox {
                    position: relative;
                    padding-left: 30px;
                    cursor: pointer;
                }
                label.checkbox:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #486A33;
                    background-color: #eee;
                    border-radius: 4px;
                }
                label.checkbox:after {
                    content: "";
                    position: absolute;
                    left: 6px;
                    top: 3px;
                    width: 8px;
                    height: 14px;
                    border: solid #486A33;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                    display: none;
                }
                input[type="checkbox"]:checked + label.checkbox:after {
                    display: block;
                }
                label.checkbox span {
                    margin-left: 10px;
                }
                .forgot-password {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 10px;
                }
                .sign-up {
                    margin-top: 10px;
                }
                button[type="submit"] {
                    background-color: #84BD00;
                    color: #486A33;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    width: 100%;
                    margin-bottom: 10px;
                    font-size: 16px;
                }
                button[type="submit"]:hover {
                    background-color: #A6F139;
                }
                .container {
                    padding: 1px;
                    text-align: center;
                }
                a:link,
                a:visited,
                a:hover,
                a:active {
                    color: #000000;
                    text-decoration: none;
                }
                `}
            </style>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#A8C698',
                fontFamily: 'sans-serif',
                margin: '0',
                padding: '0'
            }}>
                <form onSubmit={handleLogin}>
                    <div style={{ textAlign: 'center' }}>
                        <img src="/assets/LabCrate4.png" alt="Gambar Selamat Datang" />
                    </div>
                    <p>Silakan masuk dengan akun Anda</p>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Masukkan Nama Pengguna"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Masukkan Kata Sandi"
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <input type="checkbox" id="remember" name="remember" />
                        <label className="checkbox" htmlFor="remember"><span>Ingat Saya</span></label>
                        <label htmlFor="forgot-password"><a href="#">Lupa Kata Sandi?</a></label>
                    </div>
                    <button type="submit">Masuk</button>
                    <div className="container">
                        <p>Belum punya akun? <a href="signup_new.php" style={{ color: '#325D55' }}>Daftar</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
