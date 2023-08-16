import React, { useState, useEffect } from 'react';
// import './introduce.scss';
import Footer from '~/components/footer/Footer';
import Map from '~/components/map/Map';
const Contact = ({ isLoggedIn, username, id, onLogout }) => {
    return (
        <>
            
            <Map />
            

            <Footer />
        </>
    );
};

export default Contact;
