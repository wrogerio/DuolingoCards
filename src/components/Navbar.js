import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          📖Duolingo Cards📖
        </Link>
        <button onClick={() => toggleMenu()} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={expanded ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={currentRoute == "/" ? "nav-link active" : "nav-link"} href="/" onClick={() => toggleMenu()}>
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={currentRoute == "/unities" ? "nav-link active" : "nav-link"} href="/unities" onClick={() => toggleMenu()}>
                <i className="fas fa-building me-1"></i>
                Unities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={currentRoute == "/cards" ? "nav-link active" : "nav-link"} href="/cards" onClick={() => toggleMenu()}>
                <i className="fas fa-book me-1"></i>
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className={currentRoute == "/training" ? "nav-link active" : "nav-link"} href="/training" onClick={() => toggleMenu()}>
                <i className="fas fa-graduation-cap me-1"></i>
                Training
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
