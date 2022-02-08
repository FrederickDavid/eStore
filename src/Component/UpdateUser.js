import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../Component/AuthProvider';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {

    const {id} = useParams();
    console.log(id)

    const { saveUser } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const editUser = async () => {
        console.log(name, email);

        const config = {
            header: {
                authorization: `code lab ${saveUser?.token}`,
            },
        };

        const res = await axios.patch(
            `http://localhost:2222/users/${id}`,
            {
                name: name,
                email: email,
            },
            config
        );
        console.log("Update Successful", res);
        return res;
    }
    

    const fetchData = async () => {
      const res = await axios.get(`http://localhost:2222/users/${id}`);

    setAllUsers(res.data.data);
    console.log(res.data.data);
    };



    useEffect(() => {
        fetchData();
        editUser();
      }, []);
    return (
        <Container>
            <Wrapper>
            <Cards>
                <Holder>
                  <Image src={`http://localhost:2222/${allUsers.image}`} />
                <Name>{allUsers.name}</Name>
                <Email>{allUsers.email}</Email>
                <Contact>{allUsers.address}</Contact>
                <Contact>{allUsers.contact}</Contact>
                </Holder>
                </Cards>
            <Card>
          <InputContent>
            <Input placeholder="Update Product Name" 
            value={name}
            onChange={(e) => {
                setName(e.target.value)
            }}
            />
            <Input placeholder="Update Email" 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            />

            <Button bg="red" cl="white" onClick={editUser}>
              Update
            </Button>
          </InputContent>
        </Card>
            </Wrapper>
        </Container>
    )
}

export default UpdateUser

const Button = styled.button `
width: 100px;
height: 50px;
background-color: #004080;
border-radius: 5px;
border: none;
color: white;
font-family: Poppins;
font-weight: 500;
margin-top: 15px;
margin-bottom: 10px;
transition: all 350ms;
transform: scale(1);
:hover{
    cursor: pointer;
    transform: scale(1.035);
}
`

const InputContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 2px solid black;
  padding-left: 10px;
  margin: 10px 0;

  ::placeholder {
    font-family: Poppins;
    opacity: 0.8;
  }
`;

const Card = styled.div`
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 100%;
  padding: 30px 0;
  margin-bottom: 50px;
  border-radius: 5px;
  display: flex;
`;

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

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cards = styled.div `
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
min-height: calc(100vh - 90px);
margin-top: 90px;
background-color: lightblue;
display: flex;
align-items: center;
justify-content: center;
`