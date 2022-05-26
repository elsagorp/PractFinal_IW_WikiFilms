import  { ChangeEvent, FormEvent, useState, FC } from 'react';

import {
  useMutation,
} from "@apollo/client";

import {LOGIN} from './Services';
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
const LogIn: FC  <{reRender: () => void}>= ({reRender}) => {
 // const navigate = useNavigate();
  const [email, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [login, {loading, error}] = useMutation(LOGIN, {
    onCompleted : (data) => {
      //const  token  = data.LogIn.toString();
     // console.log(`token ${data.LogIn}`);
      localStorage.setItem("token", data.LogIn);
      //alert("Logged in");
      reRender();
    },
    onError: err => {
      console.error(err);
      localStorage.removeItem("token");
    }
  });
  return (
       <div >     
        <div className="card">
          <h3 className= "h" >LogIn</h3>
          <br />
       <div className="card-body">
      <input placeholder="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value )} />
      <br />
      <br />
      <input type = "password"placeholder = "password" value={pwd} onChange={(e: ChangeEvent<HTMLInputElement>) => setPwd( e.target.value )} />
      <br />
      <Button onClick={() => {
        login({ variables: { email,  pwd } });
      }}>
        Log In
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :Please try again</p>}
    </div>
    </div>
    </div>

  );

};

export default LogIn;

// {loading && <p>Loading...</p>}
// {error && <p>Error :Please try again</p>}
// const handleInputChange = (
//   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   setUser({ ...user, [e.target.name]: e.target.value });
// };
// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   login({
//     variables: {
//       email: user.email,
//       pwd: user.pwd
//     },
//     onCompleted: ({ login }) => {
//       localStorage.setItem("token", login.token);
//       navigate('/home');
//     }
//   })
  
// };
// return(
//   <div >
//       <Styles>
//       <div className="col-md-4 offset-md-4">
//       <div className="card">
//         <div className="card-body" >
//           <form onSubmit={handleSubmit}>
//               <br />
//               <label>Email address</label>
//               <br />
//               <input  type="email" placeholder="Email" name = "email" onChange={handleInputChange}/>
//               <br />
//               <label>Password</label>
//               <br />
//               <input  placeholder="password"  type="password"  name= "password" onChange={handleInputChange}/>
//               <br />
//           <Button type = "submit" className="btn btn-primary mt-5" >
//                   LogIn
//               </Button>
//           </form>
//       </div>
//       </div>
//       </div>
//   </Styles>
//   </div>

// );
/* 
  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
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
      </div>
    </div>
  );
  */