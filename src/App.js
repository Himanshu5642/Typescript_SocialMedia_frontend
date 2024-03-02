import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Verification from "./pages/login/verifyPhone";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/profile/UserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { socket } from "./socket";

const queryClient = new QueryClient();

socket.on("connect", () => {
  console.log("client socket connected");
  socket.emit("userOnline");
});

socket.on("disconnect", () => console.log("client socket disconnected"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/verify" element={<Verification />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/userProfile" element={<UserProfile />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
