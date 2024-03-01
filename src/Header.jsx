import { NavLink } from "react-router-dom";
import vtLogo from './assets/vt-logo.svg'

function Header() {

    return (
        <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img src={vtLogo} className="vt-logo" />
            <span className="fs-4">VoIP Toolbox</span>
            </a>

            <ul className="nav nav-pills">
                <li className="nav-item">
                <NavLink
                    to="/utils"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    SIP Utilities
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink
                    to="/reference"
                    className="nav-link"
                >
                    Reference
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                        About
                </NavLink>
                </li>
            </ul>
        </header>
        </div>
    )
}

export default Header