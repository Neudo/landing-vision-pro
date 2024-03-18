import React from 'react';
import './header.css';

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
                <h1>Vision Pro</h1>
            </nav>

            <span className="hidden">Scroll to discover</span>
        </>
    );
}

export default Header;


