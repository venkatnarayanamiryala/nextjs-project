import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import styles from "./registerstyles"; 

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [roleId, setRoleId] = useState(3); // Default to 'User' (role ID 3)
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { username, password, confirmpassword, role_id: roleId });
      router.push("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Register</h1>
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Role:</label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(Number(e.target.value))}
              required
              style={styles.select}
            >
              <option value={1}>Admin</option>
              <option value={2}>Manager</option>
              <option value={3}>User</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </Layout>
  );
}
