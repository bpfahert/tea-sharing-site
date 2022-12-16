import React from "react";
import logo from './logo.svg';
import './App.css';


//add props to App?
function App() {
  const [apiResponse, setApiResponse] = React.useState("");
  
  //API not sending?
  function callApi() {
    fetch("http://localhost:9000/testapi")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => err);
  }

  React.useEffect(() => {
    callApi();
  }, []);


  return (
    <div className="App">
      <p className="App-intro">{apiResponse}</p>
      <p>Hello!</p>
    </div>
  );
}

export default App;
