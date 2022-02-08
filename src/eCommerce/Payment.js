import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {total} from "./eStoreGlobalState"

const Register = () => {
    const dispatch = useDispatch()

  const myData = useSelector((state) => state.reducers.cart);
  const myTotal = useSelector((state) => state.reducers.MyTotalCost);

  useEffect(() => {
      dispatch(total())
  }, [myData])


  return (
    <Container>
      <Wrapper>
        <Card>
          <InputContent>
            <Input placeholder="Enter Name" />
            <Input placeholder="Enter your Email" />
            <Input placeholder="State you currently reside in" />
            <Input placeholder="Enter your Address" />
            <Input placeholder="Contact" />
            <Foot>Total Price: #{Math.ceil(myTotal)}</Foot>
            <Button bg="red" cl="white">
              Pay Now
            </Button>
          </InputContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Foot = styled.div`
font-size: 20px;
font-weight: bold;
`;

const Button = styled.div`
  padding: 10px 35px;
  margin: 15px 10px;
  border: none;
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  font-weight: bold;
  font-size: 13px;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;
  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;

const InputContent = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 2px solid lightblue;
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

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  height: 100%;
  background: white;
  font-family: Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
