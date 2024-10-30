import app from "./app";

const PORT = process.env.PORT || 6041;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
