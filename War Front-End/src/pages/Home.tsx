import React, { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginHandler = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });
      authContext?.login(username, response.data.token);
      setSuccessMessage("Login successful");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect username or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
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

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Home;
