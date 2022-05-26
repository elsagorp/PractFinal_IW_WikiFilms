import { ChangeEvent, FormEvent,FC, useState } from 'react';

import {useMutation} from "@apollo/client";
import {SIGN_IN} from './Services';
import '../App.css';
import styled from "styled-components";



const Button = styled.button`
  background: "white";
  color: "aquamarine";

  font-size: 1em;
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




const UserForm: FC<{reRender: () => void}>= ({reRender})  =>  {
  //const navigate = useNavigate();
  const [email, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [signup,{data,error,loading}] = useMutation(SIGN_IN, {

    onCompleted: ( signup ) => {
      // localStorage.setItem(AUTH_TOKEN, signup.token);
      //localStorage.setItem("token", signup.token);
     // navigate('/');
     alert("Signed up");
      reRender();
    },
    onError: err => {
      console.error(err);
    }

  });
  return (
        <div className="col-md-4 offset-md-4">     
        <div className="card" >
        <h3 className="h">Sign Up</h3>
          <br />
      <div className="card-body">
      <input placeholder="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value )} />
      <br />
      <br />
      <input type = "password"placeholder = "password" value={pwd} onChange={(e: ChangeEvent<HTMLInputElement>) => setPwd( e.target.value )} />
      <br />
      <Button onClick={() => {
        signup({ variables: { email, pwd } });
      }}>
        Sign Up
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :Please try again</p>}
    </div>
    </div>
    </div>
  );
};



/*
        <button
          className="pointer mr2 button"
          onClick={() => console.log('onClick')}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>



  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    SetUser({variables: { email: user.email, password: user.password}});
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //await UserService.createUser(user).then(() => {history.push('/list');})
    
  };
return(
    <div className="App">
    <Container className="App-header">
        <Styles>
        <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body" >
            <form onSubmit={handleSubmit}>
                <br />
                <label>Email address</label>
                <br />
                <input   type="email" placeholder="Email" name = "email" onChange={handleInputChange}/>
                <br />
                <br />
                <label>Password</label>
                <br />
                <input   type="password" placeholder="Password" name = "password" onChange={handleInputChange}/>
                <br />
            <Button type = "submit" className="btn btn-primary mt-5" onClick={()=> {if(data) alert("SIGNIN")}}>
                    Create
                </Button>
            </form>
        </div>
        </div>
        </div>
    </Styles>
    </Container>
  </div>
)

  
}
*/
export default UserForm;
