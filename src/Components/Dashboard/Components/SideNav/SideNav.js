import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';

const SideNav = ({id, userInfo}) => {

   const cookies = new Cookies();
   const history = useHistory();

    const logout = () => {
        cookies.remove('access_token', { path: '/' });
        history.push('/cat/auth/login');
    }

    return (
        <div className="sideNav">
          <img className='dashLogo' src={userInfo.logo} alt={userInfo.info_cliente.nombre_cliente} />
          <ul className="sideNav-nav">
            {
                (userInfo.info_cliente.super) ?
                (
                    <>
                        <li className="sideNav-item">
                        <Link
                            className="sideNav-link"
                            to={`/cat/auth/dashboard/${id}`}
                        >
                            <i className="fas fa-user-cog fa-fw fa-3x" />
                            <span className="link-text">Mi Perfil</span>
                        </Link>
                        </li>
                        <li className="sideNav-item">
                        <Link className="sideNav-link" to={`/cat/auth/dashboard/${id}/misClientes`}>
                            <i className="fas fa-donate fa-fw fa-3x" />
                            <span className="link-text">Mis Clientes</span>
                        </Link>
                        </li>
                        <li className="sideNav-item" onClick={() => logout()}>
                        <Link className="sideNav-link" to="#">
                            <i className="fas fa-door-open fa-fw fa-3x" />
                            <span className="link-text">Salir</span>
                        </Link>
                        </li>
                    </>
                )
                :
                (
                    <>
                        <li className="sideNav-item">
                        <Link
                            className="sideNav-link"
                            to={`/cat/auth/dashboard/${id}`}
                        >
                            <i className="fas fa-user-cog fa-fw fa-3x" />
                            <span className="link-text">Mi Perfil</span>
                        </Link>
                        </li>
                        <li className="sideNav-item">
                        <Link
                            className="sideNav-link"
                            to={`/cat/auth/dashboard/${id}/crearCategoria`}
                        >
                            <i className="far fa-clipboard fa-fw fa-3x" />
                            <span className="link-text">Crear Categoría</span>
                        </Link>
                        </li>
                        <li className="sideNav-item">
                        <Link className="sideNav-link" to={`/cat/auth/dashboard/${id}/misCategorias`}>
                            <i className="fas fa-receipt fa-fw fa-3x" />
                            <span className="link-text">Mis Categorías</span>
                        </Link>
                        </li>
                        <li className="sideNav-item" onClick={() => logout()}>
                        <Link className="sideNav-link" to="#">
                            <i className="fas fa-door-open fa-fw fa-3x" />
                            <span className="link-text">Salir</span>
                        </Link>
                        </li>
                    </>
                )
            }
          </ul>
        </div>
    );
}
 
export default SideNav;