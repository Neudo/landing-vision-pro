import React from 'react';
import './header.css';
import logo from '../../img/logo-visionpro.png';


function Header(props) {

    window.addEventListener('scroll', () => {

        if(window.scrollY <= 49){
            document.querySelector('span').classList.remove('hidden')
        } else {
            document.querySelector('span').classList.add('hidden')
        }
    })
    return (
        <>
            <nav>
                <img  src={logo} alt="Logo apple vision pro"/>
            </nav>
            <span className="hidden">Scroll to discover</span>
        </>
    );
}

export default Header;


