import http from "http";
import app from "./app/app.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
