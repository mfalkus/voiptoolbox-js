import { NavLink } from "react-router-dom";

function SIPUtilsWrapper(props) {
    return (
        <>
            <nav className="navbar navbar-expand-md vt-navbar">
            <nav className="nav nav-masthead">
            <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink
                    to="/utils/"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    SIP DNS Lookup
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/utils/auth"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    SIP Auth Tools
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/utils/packet"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    Packet Analysis
                </NavLink>
            </li>
            </ul>
            </div>
            </nav>
            </nav>
            {props.children}
        </>
    );
}

export default SIPUtilsWrapper;