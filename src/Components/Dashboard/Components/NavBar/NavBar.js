import React from 'react';

const NavBar = () => {
   return (
      <header className="navbar navbar-sticky navbar-expand-lg">
         <div className="container position-relative">
            <a className="navbar-brand" href="/">
               {/* <img className="navbar-brand-regular" src='/assets/img/logo.png' alt="brand-logo" />
                    <img className="navbar-brand-sticky" src="/assets/img/logo.png" alt="sticky brand-logo" /> */}
            </a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="navbarToggler" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-inner">
               {/*  Mobile Menu Toggler */}
               <button className="navbar-toggler d-lg-none" type="button" data-toggle="navbarToggler" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
               </button>
               <nav>
                  <ul className="navbar-nav" id="navbar-nav">
                     <li className="nav-item">
                        <a className="nav-link scroll" href="#features">Crear Empresa</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link scroll" href="#features">Mis Clientes</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link scroll" href="#features">Crear Categoría</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link scroll" href="#features">Mis Categorías</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link scroll" href="#contact">Contacto</a>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   );
}

export default NavBar;