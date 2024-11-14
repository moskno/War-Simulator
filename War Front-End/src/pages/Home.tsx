import React, { useContext, useState } from "react";
// import axios from "axios";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [organization, setOrganization] = useState("IDF - North");

  const loginHandler = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });
      authContext?.login(username, response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Home;
