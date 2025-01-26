import { useState, useEffect } from "react";
import api from "@/utils/api";
import Layout from "@/components/sublayout";
import { useRouter } from "next/router";
import styles from "./addtaskstyles";
import Link from "next/link";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tstatus, setTstatus] = useState("created");
  const [assigned, setAssigned] = useState(1);
  const [created, setCreated] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [taskId, setTaskId] = useState(null); 
  const router = useRouter();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCreated(userId);
    } else {
      console.error("User ID not found. Please log in.");
      router.push("/login");
    }

    
    const { taskId } = router.query;
    console.log(taskId)
    if (taskId) {
      setTaskId(taskId);
      setIsEditing(true); 
      fetchTaskData(taskId);
    }
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users"); 
      console.log("user",response.data)
      setUsersList(response.data); 
    } catch (error) {
      console.error("Failed to fetch users list", error);
      alert("Failed to load users list.");
    }
  };

  const fetchTaskData = async (taskId) => {
    try {
      const response = await api.get(`/tasks/?taskId=${taskId}`);
      const tasks = response.data;
      console.log(tasks)
  
      
      const task = tasks.find((task) => String(task.id) === String(taskId));
      console.log(task.created_by)
  
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setTstatus(task.status);
        setAssigned(task.assigned_to);
      } else {
        alert("Task not found.");
      }
    } catch (error) {
      console.error("Failed to fetch task data", error);
      alert("Failed to load task details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/tasks/${taskId}`, {
          title,
          description,
          status: tstatus,
          assigned_to: assigned,
        });
      } else {
        await api.post("/tasks", {
          title,
          description,
          status: tstatus,
          assigned_to: assigned,
          created_by: created,
        });
      }
      handleBackClick()
    } catch (error) {
      console.error(error);
      alert("Error saving task.");
    }
  };

  const handleBackClick = () => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "Admin") {
      router.push("/admintasks");
    } else if (userRole === "User") {
      router.push("/usertasks");
    } else {
      console.error("User role not found.");
      router.push("/login");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>{isEditing ? "Edit Task" : "Add Task"}</h1>
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
            <textarea
              type="textArea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
              <label style={styles.label}>Status:</label>
              {isEditing ? (
                
                <select
                  value={tstatus}
                  onChange={(e) => setTstatus(e.target.value)}
                  style={styles.input}
                >
                  <option value="Created">Current Status - {tstatus}</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Active">Active</option>
                </select>
              ) : (
                <span style={styles.text}>{tstatus}</span>
              )}
            </div>


            <div style={styles.inputGroup} hidden={!isEditing}>
            <label style={styles.label}>Assigned to:</label>
            {isEditing ? (
              <select
                value={assigned}
                onChange={(e) => setAssigned(e.target.value)}
                style={styles.input}
              >
                <option value="">-- Select User --</option>
                {usersList.map((user) => (
                  <option key={user.id} value={user.t_id}>
                    {user.username}
                  </option>
                ))}
              </select>
            ) : (
              <span style={styles.text}>
                {usersList.find((user) => user.id === assigned)?.name ||
                  "Unassigned"}
              </span>
            )}
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
          
          <button type="button" onClick={handleBackClick}>
            Back
          </button>
        </form>
      </div>
    </Layout>
  );
}
