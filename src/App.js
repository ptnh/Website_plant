import Header from './pages/header/Header';
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Product from './pages/Product';
import Carts from './pages/carts/Carts.js';
import Pay from './pages/pay/Pay';
import Body from './components/Body';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Introduce from './pages/introduce/Introduce';
import Contact from './pages/contact/Contact';
import Policy from './pages/policy/Policy';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [idFlag, setIdFlag] = useState('');

    const handleLogin = (username, id) => {
        setIsLoggedIn(true);
        setUsername(username);
        setIdFlag(id);
        alert(id + 's');

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('idFlag', id);
        localStorage.setItem('username', username);
    };

    // useEffect(() => {
    //     // setIdFlag(id);
    //     alert(idFlag);
    //   }, [idFlag])

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    };

    useEffect(() => {
        // Logic xử lý khi idFlag thay đổi
        console.log(idFlag);
        // Cập nhật giá trị trong localStorage hoặc thực hiện các hành động khác
    }, [idFlag]);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        const storedIdFlag = localStorage.getItem('idFlag');
        if (storedIsLoggedIn && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setIdFlag(storedIdFlag);
        }
    }, []);

    return (
        <Router>
            {isLoggedIn ? (
                <>
                    <Header isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />
                    <div className="App">
                        <Routes>
                            <Route path="/" element={[<Body username={username} id={idFlag} />, <Footer />]} />
                            <Route
                                path="/product"
                                element={<Product isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/introduce"
                                element={<Introduce isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/contact"
                                element={<Contact isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/policy"
                                element={<Policy isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/carts"
                                element={<Carts isLoggedIn={isLoggedIn} username={username} id={idFlag} />}
                            />
                            <Route
                                path="/pay"
                                element={<Pay isLoggedIn={isLoggedIn} username={username} id={idFlag} />}
                            />
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/register" />
                        </Routes>
                    </div>
                </>
            ) : (
                <>
                    <div className="App">
                        <Routes>
                            <Route
                                path="/"
                                element={[
                                    <Header
                                        isLoggedIn={isLoggedIn}
                                        username={username}
                                        id={idFlag}
                                        onLogout={handleLogout}
                                    />,
                                    <Body username={username} id={idFlag} />,
                                    <Footer />,
                                ]}
                            />
                            <Route
                                path="/introduce"
                                element={<Introduce isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/product"
                                element={<Product isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route
                                path="/contactss"
                                element={<Contact isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
                            />
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </>
            )}
        </Router>
    );
}

export default App;
