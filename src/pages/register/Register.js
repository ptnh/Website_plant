import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';

function Register() {
    const [accounts, setAccounts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name_client, setNameClient] = useState('');
    const [address, setAddressClient] = useState('');
    const [email, setEmailClient] = useState('');
    const [phone, setPhoneClient] = useState('');
    const navigate = useNavigate();

    const [carts, setCarts] = useState([]);

    //tạo account
    const handleCreateAccount = () => {
        const accountAPI = 'http://localhost:3000/accounts';
        const newAccount = {
            name_clients: name_client,
            email_client: email,
            phone_client: phone,
            address_client: address,
            username_account: username,
            password_account: password,
        };

        fetch(accountAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        })
            .then((response) => response.json())
            .then((data) => {
                setAccounts([...accounts, data]);
                setUsername('');
                setPassword('');
                navigate('/login');
            })
            .catch((error) => console.error('Error creating post:', error));
    };

    return (
        <div className="box_register">
            <div className="form_register">
                <img src="logo.jpg" alt="Logo"></img>
                <h2>Đăng ký tài khoản</h2>
                <form className="form_mini">
                    <div className="info_user">
                        <div className="inputBox">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập họ và tên:"
                                value={name_client}
                                onChange={(e) => setNameClient(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Nhập địa chỉ:"
                                value={address}
                                onChange={(e) => setAddressClient(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Nhập SĐT:"
                                value={phone}
                                onChange={(e) => setPhoneClient(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Nhập email:"
                                value={email}
                                onChange={(e) => setEmailClient(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="info_account">
                        <div className="inputBox">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Nhập tên tài khoản"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu tài khoản"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <button className="btn_dangky_register" type="submit" onClick={handleCreateAccount}>
                    Tạo tài khoản
                </button>
                <button className="btn_logins_register">
                    <a href="http://localhost:2112/login">Đăng nhập</a>
                </button>
            </div>
        </div>
    );
}

export default Register;
