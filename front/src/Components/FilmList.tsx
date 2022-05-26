import {  useState, FC } from 'react';
import { Film } from './User';
import FilmItem from './FilmItem';

import {
  useQuery
} from "@apollo/client";
import {GET_FILMS} from './Services';
import styled from "styled-components";

import FilmCreate from './FilmCreate';

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

const FilmList:FC<{reRender: ()=> void}> = ({reRender}) => {

  const tok = localStorage.getItem("token");
  const [fresh, setFresh] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery<{getFilms: Film[]}>(GET_FILMS,
    {context: {
      headers: {
        authorization: tok,
      }  
      
    },
    onCompleted : (data) => {
      console.log(data.toString());
    },
    onError : (error) => {
      console.error(error);
    }

  });
    
  if(fresh) {

    refetch();
    setFresh(false);
  }
  if (loading) return <p>Loading...</p>;
  if (error){
    if(error.message.includes("Unauthorized")){
      localStorage.removeItem("token");
      setTimeout(reRender, 5000);
      return <p>You have to login first </p>
    }
     return <p>Error :</p>;
  }
 // if(data){
    return (
      <div >
     
        <br />

        {create ? <FilmCreate reRender = {()=> setCreate(!create)} />:
             <div>
               <Button onClick={() => setCreate(!create)}>
                    Create Film
                </Button>
                
                <br />
                <div className = "Cards">
                {data?.getFilms.map((film) => {
                  return <FilmItem film={film} key={film._id} reRender = {()=>setFresh(true)}/>;
                })   }

                </div>
                <div>
            
                </div>
                
              </div>
              
        
        }
        
        </div>
        
    );
 

};



export default FilmList;