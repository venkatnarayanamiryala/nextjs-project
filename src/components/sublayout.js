import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router'; 
import Link from "next/link";
import styles from "./layoutstyles"; 

export default function Layout({ children }) {
  const router = useRouter(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("userName");
      const storedUserRole = localStorage.getItem("userRole");
      
      setUsername(storedUsername);
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");

    router.push("/");
  };

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <Link href="/addtask" style={styles.navLink}>Create New Task</Link>
        <span style={styles.separator}>|</span>
        <button onClick={handleLogout} style={styles.navLink}>Logout</button>
        <span style={styles.separator}>|</span>
        
        <img 
          src="profilepic.png" 
          alt="User Icon"
          style={styles.userIcon}
          onClick={handleProfileClick} 
        />
      </nav>
      
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Role:</strong> {userRole}</p>
          </div>
        </div>
      )}

      <main style={styles.main}>{children}</main>
    </div>
  );
}
