import React,{useState} from 'react';
import FilmList from './Components/FilmList';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import styled from "styled-components";
import {
    useMutation,
  } from "@apollo/client";
import {LOGOUT} from './Components/Services';

const Button = styled.button`
  background: "white";
  color: "aquamarine";

  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid aquamarine;
  border-radius: 3px;
  &:hover{
            color: #6520e4;
            cursor: pointer;
        }
`;

const Home = () => {
    const [render, setRender] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);
    const token = localStorage.getItem("token");

    const [LogOut, {loading, error}] = useMutation(LOGOUT, {
        context: {
          headers: {
            authorization: token
          }
        },
        onCompleted: data => {
            localStorage.removeItem("token");
            setLogout(false);
            setRender(true);
            
        },
        onError: err => {
          console.error(err);
        }
      });
    return(
        <div className="Container">
        {token ?  <div>

                    <Button onClick={() => {LogOut()}}>
                        LogOut
                    </Button>
                    <br />
                   {!logout &&
                    <FilmList reRender = {()=> setRender(!render)}/>}
                          {loading && <p>Loading...</p>}
                          {error && <p>Error :Please try again</p>}
                    </div>
             : 
    
            <div>
                    <br />
                    <Button onClick={() => {setLogin(true) 
                      setSignup(false)}}>
                        LogIn
                    </Button>
                    <Button onClick={() => {setSignup(true)
                       setLogin(false)}}>
                        Sign Up
                    </Button>
                    <br/>
                    {login ? <LogIn reRender = {()=> setRender(!render)}/> : 
                    <div>
                        {signup ? <SignUp reRender = {()=> setRender(!render)}/> : <div>
                          <h1>Welcome to WikiFilms</h1>
                          </div>}
                    </div>}
                            
             </div>}
            


        </div>
        );

  }
export default Home;

