import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../Component/images.png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Register = () => {
  const [image, setImage] = useState(images);
  const [imageDB, setImageDB] = useState("");

  const userModel = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    contact: yup.number().required(),
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setImageDB(file);
  };

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(userModel),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { name, email, password, address, contact } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("image", imageDB);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios.post("http://localhost:2222/register", formData, config); 
    reset()
  });


  return (
    <Container>
      <Wrapper>
        <Card onSubmit={onSubmit} type="multipart/form-data">
          <Image src={image} />
          <Label htmlFor="pix">Upload Image</Label>
          <ImageInput id="pix" type="file" 
          accept="image/jpg, image/gif, image/png"
          onChange={uploadImage}
          />

          <InputContent>
            <Input placeholder="Enter Name" {...register("name")}/>
            <Input placeholder="Enter your Email" {...register("email")}/>
            <Input placeholder="Set your Password" {...register("password")}/>
            <Input placeholder="Enter your Address" {...register("address")}/>
            <Input placeholder="Enter your Contact" {...register("contact")}/>

            <Button bg="red" cl="white" type="submit" >
              Register
            </Button>
          </InputContent>

          <Text>
            {" "}
            Already have an Account, <Span to="/SignIn">Click to Sign in</Span>{" "}
          </Text>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

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

const ImageInput = styled.input`
  display: none;
`;

const Label = styled.label`
  margin: 10px 0;
  padding: 7px 60px;
  background: red;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;
  border-radius: 30px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: lightcyan;
  object-fit: cover;
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
