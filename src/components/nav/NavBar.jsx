import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <div>
                <Link to="/">Dashboard</Link>
                <Link to="Login">Login</Link>
                <Link to="Register">Register</Link>
            </div>
        </nav>
    )
};

export default NavBar;