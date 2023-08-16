import Header from './components/header/Header';
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Product from './pages/product/Product';
import Carts from './pages/carts/Carts.jsx';
import Pay from './pages/pay/Pay';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Introduce from './pages/introduce/Introduce';
import Contact from './pages/contact/Contact';
import Policy from './pages/policy/Policy';
import Info from './pages/info/Info';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [idFlag, setIdFlag] = useState('');

    const handleLogin = (username, id) => {
        setIsLoggedIn(true);
        setUsername(username);
        setIdFlag(id);
        // alert(id + 's');

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
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        const storedIdFlag = localStorage.getItem('idFlag');
        if (storedIsLoggedIn && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setIdFlag(storedIdFlag);
        }
    }, []);

    const [carts, setCarts] = useState([]);
    const cartsAPI = 'http://localhost:8080/webplant_api/cart_api/read.php';
    const updateCarts = () => {
        fetch(cartsAPI)
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.id_owner === idFlag);
                setCarts(filteredData);
            });
    };


    return (
        <Router>
            {isLoggedIn ? (
                <>
                    <Header onCartUpdate={updateCarts} isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />
                    <div className="App">
                        <Routes>
                            <Route path="/" element={[<Body onCartUpdate={updateCarts} username={username} id={idFlag} />, <Footer />]} />
                            <Route
                                path="/product"
                                element={<Product onCartUpdate={updateCarts} isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>}
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
                                path="/info"
                                element={<Info isLoggedIn={isLoggedIn} username={username} id={idFlag} />}
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
                                    <Header onCartUpdate={updateCarts} isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />,
                                    <Body onCartUpdate={updateCarts} username={username} id={idFlag} />,
                                    <Footer />,
                                ]}
                            />
                            <Route
                                path="/introduce"
                                element={[
                                <Header isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />,
                                <Introduce isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>]}
                            />
                            <Route
                                path="/product"
                                element={[
                                <Product isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>]}
                            />
                            <Route
                                path="/contact"
                                element={[
                                <Header isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />,
                                <Contact isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>]}
                            />
                            <Route
                                path="/policy"
                                element={[
                                <Header isLoggedIn={isLoggedIn} username={username} id={idFlag} onLogout={handleLogout} />,
                                <Policy isLoggedIn={isLoggedIn} username={username} ids={idFlag}/>]}
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
