import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, LoadingContext } from "../../context";
import useUsers from "../../customHooks/useUsers";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 2;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Brand = styled(Link)`
  font-size: 26px;
  font-wight: bold;
  color: black;
  text-decoration: none;
  padding: 0 12px;
  flex-shrink: 0;

  span {
    color: #fc633a;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const NavbarList = styled.div`
  display: flex;
  justify-content: center;
`;

const Nav = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  padding: 12px;

  &:hover {
    background: #fc633a;
    color: white;
  }

  ${(props) =>
    props.$active &&
    `
    background: #fc633a;
    color: white;

  `}
`;

function Navbar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const { handleLogout } = useUsers();

  return (
    <Container>
      <Brand to={"/"}>
        <span>Orange</span> & Black
      </Brand>

      <Wrapper>
        <NavbarList>
          <Nav to={"/"} $active={location.pathname === "/"}>
            Home
          </Nav>
          <Nav to={"/about"} $active={location.pathname === "/about"}>
            About
          </Nav>
          {user && (
            <Nav to={"/new-post"} $active={location.pathname === "/new-post"}>
              New Post
            </Nav>
          )}
          {user && (
            <Nav to={"/admin"} $active={location.pathname === "/admin"}>
              Manage
            </Nav>
          )}
        </NavbarList>

        {!isLoading && (
          <NavbarList>
            {!user && (
              <Nav to={"/login"} $active={location.pathname === "/login"}>
                Login
              </Nav>
            )}
            {!user && (
              <Nav to={"/register"} $active={location.pathname === "/register"}>
                Sign Up
              </Nav>
            )}
            {user && (
              <Nav to={""} onClick={handleLogout}>
                Lougout
              </Nav>
            )}
          </NavbarList>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
