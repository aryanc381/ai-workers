export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI Workers</h1>
      <p style={styles.text}>You're signed in. Dashboard coming soon.</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: 12,
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
  },
  text: {
    fontSize: 16,
    color: "#6b7280",
  },
};
