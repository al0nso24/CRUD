import { Link } from "react-router-dom";

export default function Header (){
    return(
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container-fluid">
                <Link class="navbar-brand fw-bold fs-3" to="/">AlonsoCorp</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Empleados</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/busqueda">Consulta</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}