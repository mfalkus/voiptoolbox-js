import { NavLink } from "react-router-dom";

function ReferenceHeader() {
    return (
        <nav className="navbar navbar-expand-md vt-navbar">
            <nav className="nav nav-masthead">
            <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink
                    to="/utils/reference/diagram"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    Diagrams
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/utils/reference"
                    end
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')}
                >
                    Reference
                </NavLink>
            </li>
            </ul>
            </div>
            </nav>
        </nav>
    );
}

export default ReferenceHeader;