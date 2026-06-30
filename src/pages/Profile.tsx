import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteUser, updateProfile } from "firebase/auth";
import styles from "../styles/auth-styles";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle profile update submission
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!user) {
      setError("User not found");
      return;
    }
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      setSuccess("Profile updated Successfully!");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        setError("User not found");
        return;
      }
      await deleteUser(user);
      setSuccess("Account deleted seccuessfully");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.form}>
      
      {user?.displayName && <h2>Welcome, {user.displayName}!</h2>}

      <form onSubmit={handleUpdateProfile}>
        <input
          style={styles.input}
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Name"
        />
        <input
          style={styles.input}
          disabled={true}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <div className="buttons d-flex gap-3">
          <button style={styles.button} type="submit">
            Update Profile
          </button>

          {success && <p style={styles.success}>{success}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <div>
            {user && (
              <button
                type="button"
                onClick={() => navigate("/orders")}
                style={styles.viewOrderButton}
              >
                View Orders
              </button>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={handleDeleteAccount}
              style={styles.deleteAccountButton}
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
