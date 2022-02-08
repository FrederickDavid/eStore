import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import {AiFillDelete} from "react-icons/ai"
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../Component/AuthProvider';
import { addProduct, addCart} from "./eStoreGlobalState"

const StoreScreen = () => {

    const { saveUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const myData = useSelector((state) => state.reducers.product);
    const cartData = useSelector((state) => state.reducers.cart);

    const fetchData = async () => {
      const res = await axios.get("http://localhost:2222/store");

    console.log(res.data.data);
    dispatch(addProduct(res.data.data));
    };

    const deleteItem = async (id) => {
        const config = {
            headers: {
                authorization: `code lab ${saveUser?.token}`,
            },
        };
        await axios.delete(`http://localhost:2222/store/${id}`, config)
    };

    useEffect(() => {
        fetchData();
        localStorage.setItem("cart", JSON.stringify(cartData))
      }, []);
    return (
        <Container>
            <Welcome>
                Welcome back <span>{saveUser?.name}</span>
            </Welcome>
            <Wrapper>
                {myData.map((props) => (
                    <Card key={props._id}>
                    {saveUser?.isAdmin ? (
                        <Head><AiFillDelete 
                        onClick={(id) => {
                            deleteItem(props._id);
                            window.location.reload()
                          }}/></Head>
                            ): null}
                    <Link to={`/UpdateItem/${props._id}`}>
                    <Image src={`http://localhost:2222/${props.image}`} />
                    </Link>
                    <Name>{props.name}</Name>
                    <Description>{props.description}</Description>
                    <Price><span>#{props.price}</span></Price>
                    <Button
                    onClick={()=>{
                        console.log("Hello");
                        dispatch(addCart(props));
                    }}
                    >Add to cart</Button>
                    </Card>
                ))}
                
            </Wrapper>
        </Container>
    )
}

export default StoreScreen

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

const Price = styled.div `
font-style: italic;
color: red;
font-weight: 600;
margin-top: 10px;
`

const Name = styled.div `
width: 90%;
margin-top: 10px;
text-align: center;
font-size: 15px;
font-weight: bold;
font-family: Poppins;
text-transform: uppercase;
display: flex;
justify-content: center;
span{
    color: red;
    font-style: italic;
}
`
const Description = styled.div `
width: 90%;
margin-top: 10px;
text-align: center;
font-size: 12px;
display: flex;
justify-content: center;
font-family: Poppins;
display: flex;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: contain;
  background-color: rgba(0, 0, 0, 24%);
  object-fit: cover;
  margin-top: 10px;
  border: 2px solid #004080;
`

const Head = styled.div `
margin-left: 85%;
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

const Card = styled.div `
width: 300px;
height: auto;
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
min-height: calc(100vh - 90px);
margin-top: 90px;
background-color: lightblue;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`