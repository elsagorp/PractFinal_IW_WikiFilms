
import  { ChangeEvent, FC, FormEvent, useState } from 'react';

import {
  useMutation,
} from "@apollo/client";

import {UPDATE_FILM} from './Services';
import '../App.css';


const FilmUp: FC <{reRender: ()=> void, id: string}> = ({ reRender, id}) => {
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  
  const t = localStorage.getItem("token");
  const [updatefilm, {loading, error}] = useMutation(UPDATE_FILM,   {
    context: {
        headers: {
        authorization: t
        }
    },
    onCompleted: data => {
        reRender();
    //  navigate("/");
    },
    onError: err => {
      console.error(err);
    }
  });
  return (
       <div className="col-md-4 offset-md-4">     
        <div className="card">
       <div className="card-body">
      <input placeholder="Title" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName( e.target.value )} />
      <br />
      <input type = "text" placeholder = "description" value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription( e.target.value )} />
      <br />
      < button onClick={() => {
        updatefilm({ variables: {id, name, description } }).then(()=>{
            alert("Film Updated");
          });
      }}>
        Edit
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :Please try again</p>}
    </div>
    </div>
    </div>

  );

};



export default FilmUp;