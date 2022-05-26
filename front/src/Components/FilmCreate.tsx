import  { ChangeEvent, FC, FormEvent, useState } from 'react';

import {
  useMutation,
} from "@apollo/client";

import {ADD_FILM} from './Services';
import styled from "styled-components";


const Button = styled.button`
  background: "white";
  color: "aquamarine";

  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid aquamarine;
  border-radius: 3px;
  &:hover{
            color: red;
            cursor: pointer;
        }
`;

const Styles = styled.div`
    .form {
        background-color: #0c0c0c;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        display: flex;
        text-align: center;

        
    }
    .button{
        color: #33FFDA;
        font-size: 1em;
        &:hover{
            color: white;
        }
    }
    .form-label{
        font-size: 1.5em;
        color: #33FFDA;
        justify-content: space-around;

    }
    .form-control{
        font-size: 1em;
    }
`;
const CreateFilm: FC <{reRender: ()=> void}> = ({ reRender}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const tokk = localStorage.getItem("token");
  const [addfilm, {loading, error}] = useMutation(ADD_FILM,   {
    context: {
        headers: {
        authorization: tokk,
        }
    },
    onCompleted : (data) => {
       // console.log(data.toString());
        
        reRender();
    },
    onError: err => {
      console.error(err);
    }
  });
  return (
       <div className="col-md-4 offset-md-4">     
        <div className="card">
       <form>
      <input placeholder="Title" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName( e.target.value )} />
      <br />
      <input type = "text" placeholder = "Description" value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription( e.target.value )} />
      <br />
      < Button onClick={() => {
        addfilm({ variables: {name, description } }).then(() => {
          alert("Film Added");
          });
      }}>
        Add Film
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :Please try again</p>}
    </form>
    </div>
    </div>

  );

};

export default CreateFilm;