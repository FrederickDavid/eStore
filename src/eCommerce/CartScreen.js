import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../Component/AuthProvider';
import { addProduct, addCart, removeCart, changeItem, total} from "./eStoreGlobalState"

const StoreScreen = () => {

    const { saveUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const myData = useSelector((state) => state.reducers.cart);
    const myTotal = useSelector((state) => state.reducers.MyTotalCost);

    const fetchData = async () => {
      const res = await axios.get("http://localhost:2222/store");

    console.log(res.data.data);
    dispatch(addProduct(res.data.data));
    };

    useEffect(() => {
        fetchData();
        dispatch(total());
      }, [myData]);
    return (
        <Container>
            <Welcome>
                Welcome back <span>{saveUser?.name}</span>
            </Welcome>
            <Holds> 
            <Button bg="whitesmoke" cl="black"
            >Total Price: #{Math.ceil(myTotal)}</Button>
            <Buttons bg="red" cl="white" to="/Payment"
            >Payment</Buttons>
            </Holds>
            <Wrapper>
                {myData.map((props) => (
                    <Card key={props._id}>
                    <Image src={`http://localhost:2222/${props.image}`} />
                    <Name>{props.name}</Name>
                    <Description>{props.description}</Description>
                    <Price><span>Price per item: #{props.price}</span></Price>
                    <Price><span>Total Price: #{props.price * props.QTY}</span></Price>
                    <Hold>
                        <Minus
                        onClick={()=>{
                            dispatch(changeItem(props))
                        }}
                        >-</Minus>
                        <Quantity>{props.QTY}</Quantity>
                        <Add 
                        onClick={()=>{
                            dispatch(addCart(props))
                        }}
                        >+</Add>
                    </Hold>
                    <Button bg = "#004080" cl="white"
                    onClick={()=>{
                        console.log("Hello");
                        dispatch(removeCart(props));
                    }}
                    >Remove</Button>
                    </Card>
                ))}
                
            </Wrapper>
        </Container>
    )
}

export default StoreScreen

const Add = styled.div `
width: 30px;
height: 30px;
border-radius: 50px;
background-color: green;
color: white;
text-align: center;
font-size: 20px;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
transition: all 350ms;
transform: scale(1);
:hover{
    cursor: pointer;
    transform: scale(1.034);
}
`
const Quantity = styled.div `
font-size: 25px;
font-weight: bold;
`

const Minus = styled.div `
width: 30px;
height: 30px;
border-radius: 50px;
background-color: red;
color: white;
text-align: center;
font-size: 20px;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
transition: all 350ms;
transform: scale(1);
:hover{
    cursor: pointer;
    transform: scale(1.034);
}
`

const Hold = styled.div `
width: 200px;
height: 50px;
display: flex;
align-items: center;
justify-content: space-around;
margin: 10px 0px;
`
const Holds = styled.div `
width: 300px;
display: flex;
align-items: center;
justify-content: space-around;
margin: 10px 0px;
`

const Buttons = styled(NavLink) `
width: 100px;
height: 50px;
background-color: ${({ bg }) => bg};
border-radius: 5px;
border: none;
color: ${({ cl }) => cl};
font-family: Poppins;
font-weight: 700;
margin-top: 10px;
margin-bottom: 10px;
font-size: 13px;
transition: all 350ms;
transform: scale(1);
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;
:hover{
    cursor: pointer;
    transform: scale(1.035);
}
`
const Button = styled.button `
width: 100px;
height: 50px;
background-color: ${({ bg }) => bg};
border-radius: 5px;
border: none;
color: ${({ cl }) => cl};
font-family: Poppins;
font-weight: 700;
margin-top: 10px;
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