import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-inner'>
                <span className='navbar-brand'>Diecocan tools</span>
                <ul className='navbar-links'>
                    <li>
                        <NavLink 
                            to="/"
                            end
                            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/owners"
                            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                        >
                            Owners
                        </NavLink>
                    </li>
                </ul>
            </div>
            
        </nav>
    );
}

export default Navbar;