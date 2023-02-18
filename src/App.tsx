import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EditUser, Home, Users } from "./pages";

function App() {
  return (
    <div className="h-screen bg-slate-900 text-slate-100 w-f">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
