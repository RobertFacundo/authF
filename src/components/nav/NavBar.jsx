import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    background-color: #0d0c0c;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    font-style: italic;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
      color:  #ffd700;
    }
`;
const NavBar = () => {
    return (
        <Nav>
            <NavLinks>
                <StyledLink to="/">Dashboard</StyledLink>
                <StyledLink to="Register">Register</StyledLink>
                <StyledLink to="Login">Login</StyledLink>
            </NavLinks>
        </Nav>
    )
};

export default NavBar;