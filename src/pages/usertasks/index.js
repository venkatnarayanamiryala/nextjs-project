import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../components/sublayout";
import styles from "./tasksstyles"; // Import styles from the external file

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState({
    totalTasks: 0,
    inProgressTasks: 0,
    createdTasks: 0,
    closedTasks: 0,
  });

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setMessage("User not logged in.");
          return;
        }

        const response = await api.get(`/tasks?created_by=${userId}`);
        const fetchedTasks = response.data;

        if (fetchedTasks && fetchedTasks.length > 0) {
          setTasks(fetchedTasks);
          setMessage("");

          // Calculate summary
          const totalTasks = fetchedTasks.length;
          const inProgressTasks = fetchedTasks.filter(
            (task) => task.status === "in-progress"
          ).length;
          const createdTasks = fetchedTasks.filter(
            (task) => task.created_by === userId
          ).length;
          const closedTasks = fetchedTasks.filter(
            (task) => task.status === "closed"
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
                  <td style={styles.td}>
                    <a href="#">
                      <img
                        src="/edit.svg"
                        alt="Edit Icon"
                        style={{ width: 20, height: 20 }}
                      />
                    </a>
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
