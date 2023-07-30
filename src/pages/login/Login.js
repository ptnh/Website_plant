import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [idFlag, setIdFlag] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const accountAPI = 'http://localhost:3000/accounts';
        fetch(accountAPI)
        .then(response => response.json())
        .then(accounts => {
            const account = accounts.find(acc => acc.username_account === username);
            if (account && account.password_account === password) {
                setIdFlag(account.id);
                onLogin(username, account.id);
                navigate('/');
              } else {
                alert('Thông tin đăng nhập không chính xác');
              }
        })
        .catch(error => console.error('Error fetching accounts:', error));
    };

    return (
        <>
            <div class="box_login">
                <div className="form_login">
                    <img src="logo.jpg"></img>
                    <h2>Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="inputBox">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn-logins" type="submit">
                            Đăng nhập
                        </button>
                    </form>
                    <button className="btn-dangky">
                        <a href="http://localhost:2112/register">Đăng ký</a>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
