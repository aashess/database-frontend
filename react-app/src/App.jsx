import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState();

  let i = 0;

  const handleClick = async () => {
    const res = await fetch("http://localhost:5001/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, age: Number(age) }),
    });

    const data = await res.json();
    console.log(data);
  };

  const getUserData = async () => {
    try {
      const res = await fetch("http://localhost:5001/");
      const json = await res.json();
      setData(json);
      setCount(true);
    } catch (error) {
      console.log("Error in fetching", error);
    }
  };

  return (
    <>
      <input
        style={{
          width: "200px",
          height: "30px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={{
          width: "200px",
          height: "30px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        style={{
          width: "200px",
          height: "30px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={handleClick}>Submit</button>

      <button onClick={getUserData}>Get User Data</button>
      <div>
        {count ? (
          Array.isArray(data) ? (
            data.map((user, i) => <h2 key={i}> {++i}) {user.name}</h2>)
          ) : (
            <h2>{data.name}</h2>
          )
        ) : null}
      </div>
    </>
  );
}

export default App;
