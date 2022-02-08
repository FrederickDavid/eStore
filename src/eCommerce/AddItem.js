import React, { useState } from "react";
import styled from "styled-components";
import imag from "../eCommerce/imag.jpg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Register = () => {
  const [image, setImage] = useState(imag);
  const [imageDB, setImageDB] = useState("");

  const storeModel = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setImageDB(file);
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(storeModel),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { name, price, description} = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", imageDB);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios.post("http://localhost:2222/Item", formData, config);
  });


  return (
    <Container>
      <Wrapper>
        <Card onSubmit={onSubmit} type="multipart/form-data">
          <Image src={image} />
          <Label htmlFor="pix">Upload Product Image</Label>
          <ImageInput id="pix" type="file" 
          accept="image/jpg, image/gif, image/png,"
          onChange={uploadImage}
          />

          <InputContent>
            <Input placeholder="Enter Product Name" {...register("name")}/>
            <Input placeholder="Product Description" {...register("description")}/>
            <Input placeholder="Set Price" {...register("price")}/>

            <Button bg="red" cl="white" type="submit" >
              Add
            </Button>
          </InputContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

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
  width: 350px;
  height: 350px;
  border: 1px solid gray;
  border-radius: 5px;
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
