import React from "react";
import { Link} from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const SignIn = () => {

  const userModel = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(userModel),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await axios.post("http://localhost:2222/signIn", data);

    console.log(res.data.data);
    localStorage.setItem("user", JSON.stringify(res.data.data));
    
    reset()
  });

  return (
    <Container>
      <Wrapper>
        <Card onSubmit={onSubmit}>
          <InputContent>
            <Input placeholder="Enter your Email" {...register("email")} />
            <Input placeholder="Enter your Password" {...register("password")} />
            <Button bg="red" cl="white" type="submit">
              Sign In
            </Button>
          </InputContent>
          <Text>
            {" "}
            Don't have an Account, <Span to="/register">
              Click to Register
            </Span>{" "}
          </Text>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default SignIn;

const Span = styled(Link)`
  text-decoration: none;
  color: red;
  font-weight: bold;
`;

const Text = styled.div`
font-size: 13px;
`;

const Button = styled.button`
  padding: 10px 35px;
  margin: 15px 10px;
  border: none;
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

const Card = styled.form`
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