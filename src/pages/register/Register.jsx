import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createApiAccount } from '~/Api';
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
        const formData2 = new FormData();
        formData2.append('name_client', name_client);
        formData2.append('email_client', email);
        formData2.append('phone_client', phone);
        formData2.append('address_client', address);
        formData2.append('username_account', username);
        formData2.append('password_account', password);
        formData2.append('permission', 'USER');
        fetch(`${createApiAccount}?permission=USER`, {
            method: 'POST',
            body: formData2,
        })
            .then((response) => {
                if (response.ok) {
                    alert('Đăng ký tài khoản thành công');
                    setUsername('');
                    setPassword('');
                    navigate('/login');
                } else {
                    alert('Đăng ký tài khoản không thành công');
                    throw new Error('Có lỗi xảy khi đăng ký.');
                }
            })
            .catch((error) => console.error('Error deleting product:', error));
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
                    <a href="/login">Đăng nhập</a>
                </button>
            </div>
        </div>
    );
}

export default Register;
