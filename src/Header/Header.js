import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from "../Component/AuthProvider";
import { useSelector } from 'react-redux';

const Header = () => {
  const { saveUser } = useContext(AuthContext); 
  const myCart = useSelector((state) => state.reducers.cart);
  
    return (
        <Container>
            <LogoNav to="/">
                <Hot>Super</Hot>
                <Not>Market</Not>
            </LogoNav>
           
            <HeaderNav>  
              <Cart to="/CartScreen">Cart: {myCart.length}</Cart>
              <Links bg="orange" cl="#004080" to="/">Store</Links>
                {saveUser?.isAdmin ? (
                <>
                <Links bg="white" cl="#004080" to="/ViewUsers">View Users</Links>
                <Links bg="red" cl="#fff" to="/AddItem">Add Items</Links>
                </>
                ): null}
                {saveUser ? (
                <Links bg="black" cl="white" to="/signIn" 
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}>Logout</Links>):(
                <Links bg="red" cl="white" to="/Register">Register</Links>
                )}
            </HeaderNav>
        </Container>
    )
}

export default Header

const Links = styled(NavLink)`
  font-size: 13px;
  text-decoration: none;
  padding: 15px 35px;
  margin: 0 10px;
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  font-weight: bold;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;
const Button = styled.div`
  font-size: 13px;
  text-decoration: none;
  padding: 15px 35px;
  margin: 0 10px;
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  font-weight: bold;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`

const HeaderNav = styled.div`
 margin-right: 20px;
 display: flex;
`

const Name = styled.div`
height: 70%;
margin-left: 25px;
font-size: 20px;
font-weight: bold;
font-family: Poppins;
text-transform: uppercase;
display: flex;
flex-direction: column;
span{
  font-size: 15px;
  color: red;
  text-transform: none;
}
`

const Img = styled.img`
width: 70px;
height: 70px;
border-radius: 50px;
margin-left: 20px;
`

const Content = styled.div`
width: 370px;
height: 90%;
display: flex;
align-items: center;
`

const Not = styled.div`
font-weight: bold;
font-size: 40px;
color: blue;
display: flex;
align-items: center;
justify-content: center;
`

const Hot = styled.div`
font-weight: bold;
font-size: 40px;
color: red;
display: flex;
align-items: center;
justify-content: center;
`
const Cart = styled(NavLink)`
width: 100px;
height: 50px;
color: black;
background-color: whitesmoke;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
border-radius: 5px; 
transition: all 350ms;
transform: scale(1);
text-decoration: none;
text-transform: capitalize;
:hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`

const LogoNav = styled(NavLink)`
width: 190px;
height: 90%;
margin-left: 20px;
display: flex;
align-items: center;
justify-content: space-between;
text-decoration: none;
font-style: italic;
font-family: Poppins;
span{
    font-weight: bold;
    font-size: 30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
`

const Container = styled.div`
width: 100%;
height: 90px;
background-color: #004080;
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
top: 0;
bottom: 0;
z-index: 10;
`