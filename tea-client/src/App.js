import React from "react";
import Navbar from './components/Navbar';


export default function App(props) {
  const [apiResponse, setApiResponse] = React.useState("");

  let user = {
    username: "denny",
    url: "/denny",
    img: {data: "a"},
  }
  

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
      <Navbar  />
      <p className="App-intro">{apiResponse}</p>
      <p>Hello!</p>
    </div>
  );
}