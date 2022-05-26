

import './App.css';


import Navigation from './Navbar';
import Menu from './Menu';
import Home from './Home';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

} from "@apollo/client";



function App() {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
   
  });


  console.log(`API URL: ${process.env.REACT_APP_API_URL}`);
//<Navigation/>
  return (
    <div className = "App">
    <ApolloProvider client={client}>
      <Navigation/>
      < Menu >
        <Home />
      </Menu>
    </ApolloProvider>
    </div>
  );
}

export default App;

