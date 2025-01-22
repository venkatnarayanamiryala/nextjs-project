import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import styles from "./loginstyles"; // Import styles from the separate file
import jwtDecode from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      
      // Store the access token in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      
      // Store the userId in localStorage
      localStorage.setItem("userId", response.data.userId);
  
      // Redirect to tasks page
      router.push("/tasks");
    } catch (error) {
      setError("Invalid Credentials");
    }
  };
  


  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </Layout>
  );
}
