import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/contscts">Contacts</Link>
        </nav>

        <Routes>
          <Route path="/" exact compo={Homepage} />
          <Route path="/contacts" exact compo={Contacts} />
        </Routes>
      </div>
    </Router>
  );
}
