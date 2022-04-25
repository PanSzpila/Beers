import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container-lg bg-dark text-light px-5 pb-5">
      <h1>About Page</h1>
      <h4>
        Fake site when user can search for interesting beers and view details.
      </h4>

      <h2>
        klick the <Link to="/Shop">"shop"</Link> tab, for most interesting
        features, or "home" for description.
      </h2>
    </div>
  );
}

export default About;
