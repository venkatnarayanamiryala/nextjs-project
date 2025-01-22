import Link from "next/link";
import styles from "./layoutstyles"; // Import the styles from the separate file

export default function Layout({ children }) {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <Link href="/" style={styles.navLink}>Home</Link>
        <span style={styles.separator}>|</span>
        <Link href="/login" style={styles.navLink}>Login</Link>
        <span style={styles.separator}>|</span>
        <Link href="/register" style={styles.navLink}>Register</Link>
      </nav>
      <main style={styles.main}>{children}</main>
    </div>
  );
}
