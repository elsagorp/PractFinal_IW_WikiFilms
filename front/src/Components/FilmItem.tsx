import React,{useState, useEffect,FC} from 'react';
import { Film } from './User';

import FilmUp from './FilmUp';
import {
  useMutation
} from "@apollo/client";
import {DELETE_FILM} from './Services';

import styled from "styled-components";




const Button = styled.button`
  background: "white";
  color: "aquamarine";
  border: 2px solid aquamarine;
  border-radius: 3px;
  &:hover{
            color: #6520e4;
            cursor: pointer;
        }
`;

const FilmItem: FC<{film: Film, reRender: ()=> void}>  = ({ film, reRender}) =>{

  const [del,setI] = useState(false);
  const [update,setUp] = useState(false);
  const to = localStorage.getItem("token");
  const id = film._id;
  
  const [deletefilm, {loading, error}] = useMutation(DELETE_FILM, {
    context: {
      headers: {
        authorization: to,
      }
    },
     onCompleted: data => {

     reRender();
  
    },
    onError: err => {
      console.error(err);
    }
  });



  if(del)  {

    reRender();
    setI(false);
    setUp(false);
    
  }
  
  return (
    <div >
      {update ? <FilmUp id={film._id} reRender={()=> setUp(!update)} /> :
      <div className = "Card">
          <p >Title: <strong>
            {film.name}
            </strong>
          </p>
       
          <br />
          <p> Description:  {film.description}</p>
          <br />
          <p>Author: {film.author}</p>
          <br />
          <Button
            onClick={() => { 
              deletefilm({variables: {id}}).then(()=>{
              alert("Film Deleted");
            }); }}
          >
            {' '}
            X{' '}
          </Button>
          {loading && <p>Loading...</p>}
         {error && <p>Error :Please try again</p>}
          <Button
            onClick={() => {
              
              setUp(!update) } }
          >
            {' '}
            Edit{' '}
          </Button>
    
    </div>}
    </div>
        
  );
}
// <p>{film.author}</p>
export default FilmItem;