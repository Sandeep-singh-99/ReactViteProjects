import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  const [type, setType] = useState("password");
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIsVisible(!isVisible);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Password Toggle</h1>
      <div style={styles.inputContainer}>
        <input
          type={type}
          placeholder="Enter your password"
          style={styles.input}
        />
        <span onClick={handleToggle} style={styles.icon}>
          {isVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "300px",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    outline: "none",
  },
  icon: {
    padding: "10px",
    cursor: "pointer",
    color: "#555",
    borderLeft: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
  },
};

export default App;
