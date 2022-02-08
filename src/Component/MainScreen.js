import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import {AiFillDelete} from "react-icons/ai"
import { AuthContext } from './AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate
    const { saveUser } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);

    const fetchData = async () => {
      const res = await axios.get("http://localhost:2222/users");

    setAllUsers(res.data.data);
    console.log(res.data.data);
    };

    const deleteUser = async (id) => {
      console.log(saveUser.token)
        const config = {
            headers: {
                authorization: `code lab ${saveUser?.token}`,
            },
        };
        await axios.delete(`http://localhost:2222/users/${id}`, config)
    };

    useEffect(() => {
        fetchData();
      }, []);
    return (
        <Container>
          <Welcome>
            Welcome back <span>{saveUser.name}</span>
          </Welcome>
            <Wrapper>
            
            {allUsers.map((props) => (
            <Card key={props._id}>
                <Holder>
                {saveUser.isAdmin ? (
                <Head><AiFillDelete 
                onClick={() => {
                    deleteUser(props._id);
                    window.location.reload()
                  }}/></Head>
                    ): null}
                  <Link to={`/UpdateUser/${props._id}`}>
                  <Image src={`http://localhost:2222/${props.image}`} />
                  </Link>
                <Name>{props.name}</Name>
                <Email>{props.email}</Email>
                <Contact>{props.address}</Contact>
                <Contact>{props.contact}</Contact>
                </Holder>
                </Card>
                ))}
            </Wrapper>
        </Container>
    )
}

export default MainScreen

const Contact = styled.div `
font-weight: bold;
margin-top: 5px;
`

const Email = styled.div `
font-style: italic;
color: red;
font-weight: 600;
margin-top: 10px;
`

const Name = styled.div `
margin-top: 10px;
font-size: 20px;
font-weight: bold;
font-family: Poppins;
text-transform: uppercase;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 24%);
  object-fit: cover;
  margin-top: 20px;
`

const Head = styled.div `
margin-left: 250px;
margin-top: 10px;
font-size: 20px;
color: red;
transition: all 350ms;
transform: scale(1);
:hover{
    cursor: pointer;
    transform: scale(1.23);
}
`
const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div `
width: 300px;
height: 300px;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
display: flex;
margin: 10px 10px;
flex-direction: column;
align-items: center;transition: all 350ms;
transform: scale(1);
transition: all 350ms;
:hover{
    cursor: pointer;
    transform: scale(1.003);
    background-color: rgba(255, 255, 255, 0.74);
}
`

const Welcome = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Wrapper = styled.div `
width: 100%;
height: auto;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
overflow: hidden;
margin-top: 20px;
margin-bottom: 40px;
`

const Container = styled.div `
width: 100%;
min-height: 100vh;
margin-top: 30px;
background-color: lightblue;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`