import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },

  fieldset: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    width: "300px",
    margin: "0 auto",
  },

  legend: {
    fontSize: "1.5em",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  error: {
    color: "red",
    marginBottom: "15px",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },

  viewOrderButton: {
    padding: "10px",
    backgroundColor: "#d8b30d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteAccountButton: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default styles;
