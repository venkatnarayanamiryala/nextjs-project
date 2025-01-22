import { useState, useEffect } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import styles from "./addtaskstyles";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tstatus, setTstatus] = useState("created");
  const [assigned, setAssigned] = useState(1);
  const [created, setCreated] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   // Retrieve userId from localStorage
  //   const userId = localStorage.getItem("userId");
  //   if (userId) {
  //     setCreated(userId); // Automatically set 'created' field
  //   } else {
  //     console.error("User ID not found. Please log in.");
  //     router.push("/login"); // Redirect to login if userId is missing
  //   }
  // }, [router]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId)
    if (userId) {
      setCreated(userId);
      // setAssigned(userId)
    } else {
      console.error("User ID not found. Please log in.");
      router.push("/login");
    }
  }, [router]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", {
        title,
        description,
        status: tstatus,
        assigned_to: assigned,
        created_by: created, // Set automatically
      });
      router.push("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Add Task</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Status:</label>
            <input
              type="text"
              value={tstatus}
              onChange={(e) => setTstatus(e.target.value)}
              style={styles.input}
              disabled
            />
          </div>
          <div style={styles.inputGroup} hidden>
            <label style={styles.label}>Assigned to:</label>
            <input
              type="text"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
