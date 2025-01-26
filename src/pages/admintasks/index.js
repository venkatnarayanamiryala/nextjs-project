import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../components/sublayout";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./adminstyles"; // Import styles from the external file



export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter(); 
  const [summary, setSummary] = useState({
    totalTasks: 0,
    inProgressTasks: 0,
    createdTasks: 0,
    closedTasks: 0,
  });

  async function handleDelete(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`); // API call to delete the task
        setTasks(tasks.filter((task) => task.id !== taskId)); // Update UI
      } catch (error) {
        console.error("Failed to delete task", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  }

  const handleEdit = (taskId) => {
    console.log(taskId)
    router.push(`/addtask?taskId=${taskId}`);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setMessage("User not logged in.");
          return;
        }

        const response = await api.get(`/tasks`);
        const fetchTasks = response.data;

        if (fetchTasks && fetchTasks.length > 0) {

          if (fetchTasks.length > 0) {
            setTasks(fetchTasks);
            setMessage("");
            // Calculate summary
          const totalTasks = fetchTasks.length;
          const inProgressTasks = fetchTasks.filter(
            (task) => task.status === "In Progress"
          ).length;
          const createdTasks = fetchTasks.filter(
            (task) => task.status === "created"
          ).length;
          const closedTasks = fetchTasks.filter(
            (task) => task.status === "Closed"
          ).length;

          setSummary({
            totalTasks,
            inProgressTasks,
            createdTasks,
            closedTasks,
          });
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
      {tasks.length > 0 ? (
        <>
        <div style={styles.summaryContainer}>
        <div style={styles.summaryCard}>
          <h4>Total Tasks: {summary.totalTasks}</h4>
        </div>
        <div style={styles.summaryCard}>
          <h4>In-Progress Task: {summary.inProgressTasks}</h4>
        </div>
        <div style={styles.summaryCard}>
          <h4>Created Tasks: {summary.createdTasks}</h4>
        </div>
        <div style={styles.summaryCard}>
          <h4>Closed Tasks: {summary.closedTasks}</h4>
        </div>
      </div>
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
                
                <td style={styles.td}><button onClick={() => handleEdit(task.id)} style={{ marginRight: 8 }}>
                <img src="/edit.svg" alt="Edit Icon" style={{ width: 20, height: 20 }} />
                  </button></td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={{ border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    <img src="/delete.svg" alt="Delete Icon" style={{ width: 20, height: 20 }} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        </>
      ) : (
        <div>
          <p>{message}</p>
        </div>
      )}
    </Layout>
  );
}
