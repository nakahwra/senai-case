import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { EditUser, Home, Users } from "./pages";

function App() {
  return (
    <div className="h-screen pl-16 bg-slate-900 text-slate-100 w-f">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<EditUser />} />
          <Route path="/users/:id" element={<EditUser edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
