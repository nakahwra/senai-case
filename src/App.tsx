import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import {
  Dashboard,
  EditEnvironment,
  EditUser,
  Environments,
  Users,
} from "./pages";

function App() {
  return (
    <div className="w-full min-h-screen pl-16 bg-slate-900 text-slate-100">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<EditUser />} />
          <Route path="/users/:id" element={<EditUser edit />} />
          <Route path="/environments" element={<Environments />} />
          <Route path="/environments/create" element={<EditEnvironment />} />
          <Route path="/environments/:id" element={<EditEnvironment edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
