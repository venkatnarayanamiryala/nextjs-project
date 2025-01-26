import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import styles from "./loginstyles"; // Import styles from the separate file


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      const { access_token, userId, userRole, userName } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole.name);
      localStorage.setItem("userName", username);

      if (userRole.name === "User") {
        router.push("/usertasks");
      } else if (userRole.name === "Admin") {
        router.push("/admintasks");
      }else {
        setError("Invalid user role. Access denied.");
      }
      
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
