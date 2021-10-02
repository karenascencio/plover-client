import React,{useContext,createContext} from 'react';

export const UserContext = createContext();

export default function App() {
  return (
    <UserContext.Provider value={{name:'jorge', lastName:'castuera'}}>
      <User />
    </UserContext.Provider>
  )
}

function User() {
  const value = useContext(UserContext);  
    
  return <><h1>{value.name}</h1><br /><h2>{value.lastName}</h2></>;
}