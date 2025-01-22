import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "./tasksstyles"; // Import styles from the external file


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        console.log(userId)
        if (!userId) {
          setMessage("User not logged in.");
          return;
        }

        const response = await api.get(`/tasks?created_by=${userId}`);
        const fetchTasks = response.data;
        console.log(fetchTasks)

        if (fetchTasks && fetchTasks.length > 0) {

          if (fetchTasks.length > 0) {
            setTasks(fetchTasks);
            setMessage("");
          } else {
            setTasks([]);
            setMessage("No tasks available for the current user.");
          }
        } else {
          setTasks([]);
          setMessage("No tasks are available.");
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
        setMessage("Failed to load tasks.");
      }
    }

    fetchTasks();
  }, []);

  return (
    <Layout>
      <div style={styles.buttonContainer}>
        <Link href="/addtask" style={styles.createTaskButton}>
          Create Task
        </Link>
      </div>

      {tasks.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Created By</th>
              <th style={styles.th}>Edit</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={styles.td}>{task.id}</td>
                <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>{task.description}</td>
                <td style={styles.td}>{task.status}</td>
                <td style={styles.td}>{task.assigned_to}</td>
                <td style={styles.td}>{task.created_by}</td>
                <td style={styles.td}><a href="#"><img src="/edit.svg" alt="Edit Icon" style={{ width: 20, height: 20 }} /></a></td>
                <td style={styles.td}><a href="#"><img src="/delete.svg" alt="Edit Icon" style={{ width: 20, height: 20 }} /></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>{message}</p>
        </div>
      )}
    </Layout>
  );
}
