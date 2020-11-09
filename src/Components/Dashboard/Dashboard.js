import React from 'react';
import { useParams, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import MiPerfil from './Components/MiPerfil/MiPerfil';
import CrearEmpresa from './Components/CrearEmpresa/CrearEmpresa';
import MisClientes from './Components/MisClientes/MisClientes';
import CrearCategoria from './Components/CrearCategoria/CrearCategoria';
import MisCategorias from './Components/MisCategorias/MisCategorias';
import './Dashboard.css'

const Dashboard = () => {
  let { id } = useParams();
  console.log(id)

  return (
    <BrowserRouter>
      <div className="sideNav">
        <ul className="sideNav-nav">
          <li className="sideNav-item">
            <Link
              className="sideNav-link"
              to={`/Dashboard/${id}/miPerfil`}
            >
              <i className="fas fa-user-cog fa-fw fa-3x" />
              <span className="link-text">Mi Perfil</span>
            </Link>
          </li>
          <li className="sideNav-item">
            <Link className="sideNav-link" to={`/Dashboard/${id}/misClientes`}>
              <i className="fas fa-donate fa-fw fa-3x" />
              <span className="link-text">Mis Clientes</span>
            </Link>
          </li>
          <li className="sideNav-item">
            <Link
              className="sideNav-link"
              to={`/Dashboard/${id}/crearCategoria`}
            >
              <i className="far fa-clipboard fa-fw fa-3x" />
              <span className="link-text">Crear Categoría</span>
            </Link>
          </li>
          <li className="sideNav-item">
            <Link className="sideNav-link" to={`/Dashboard/${id}/misCategorias`}>
              <i className="fas fa-receipt fa-fw fa-3x" />
              <span className="link-text">Mis Categorías</span>
            </Link>
          </li>
          <li className="sideNav-item" onClick={() => console.log('saliendo...')}>
            <Link className="sideNav-link" to="#">
              <i className="fas fa-door-open fa-fw fa-3x" />
              <span className="link-text">Salir</span>
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route
          //Validar que el usuario este autenticado, si no lo esta, redireccionar...
          exact
          path="/Dashboard/:uid/"
          component={MisClientes}
        />
        <Route
          exact
          path="/Dashboard/:id/miPerfil"
          component={MiPerfil}
        />
        <Route
          exact
          path="/Dashboard/:id/crearEmpresa"
          component={CrearEmpresa}
        />
        <Route
          exact
          path="/Dashboard/:id/misClientes"
          component={MisClientes}
        />
        <Route
          exact
          path="/Dashboard/:id/crearCategoria"
          component={CrearCategoria}

        />
        <Route
          exact
          path="/Dashboard/:id/misCategorias"
          component={MisCategorias}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Dashboard;