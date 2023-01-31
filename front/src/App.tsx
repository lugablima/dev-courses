import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ReloadProvider from "./contexts/ReloadContext";
import UserProvider from "./contexts/UserContext";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <UserProvider>
      <ReloadProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/edit-course/:courseId" element={<EditCourse />} />
          </Routes>
        </BrowserRouter>
      </ReloadProvider>
    </UserProvider>
  );
}

export default App;
