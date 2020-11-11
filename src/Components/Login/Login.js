import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap';

const Login = (props) => {
   const isAuthenticated = props.authenticated;
   const cookies = new Cookies();
   const access_token = (isAuthenticated) ? cookies.get('access_token') : null;

   const history = useHistory();
   const initData = {
      heading: "Bienvenido!",
      content: "Mensaje de Bienvenida...",
      formHeading: "Iniciar Sesión",
      formContent: "Por favor, complete los siguientes campos con su correo electrónico y contraseña.     ",
      btnText: "Continuar"
   }
   const [loading, setLoading] = useState(false);
   const [chbxRemember, setChbxRemember] = useState(false);
   //URL Desarrollo
   // const API = 'http://localhost:8000/api/login';
   const API = 'https://www.cartaenqr.cl/api/api/';


   const formSubmit = (e) => {
      e.preventDefault();
      // axios.defaults.withCredentials = true;
      setLoading(true);


      const { cod_cliente, password } = e.target.elements;
      const expiresAt = 60 * 24;
      const dataSubmit = {
         'username': cod_cliente.value.trim(),
         'password': password.value.trim()
      };
      
      
      if (cod_cliente !== '' && password !== '') {
         
         axios.post(API + 'login', dataSubmit).then(res => {
            
            setLoading(false);
            
            console.log(res.data.access_token);
            
            if(!chbxRemember){
               cookies.set('access_token', res.data.access_token, { path: '/' })
               
               history.push(`/cat/auth/dashboard/${dataSubmit.username}`)
            }else{
               let date = new Date();
               date.setTime(date.getTime() + (expiresAt * 60 * 1000));
               const options = { path: '/', expires: date };
               cookies.set('access_token', res.data.access_token, options);
               
               history.push(`/cat/auth/dashboard/${dataSubmit.username}`)
            }

         }).catch(err => {

            setLoading(false);
            Swal.fire(
               'Credenciales Incorrectas',
               'Verifique su código de cliente y/o contraseña. Si el problema persiste, cominíquese con el administrador.',
               'error'
            )
            console.log(err)
         })

      } else {

         Swal.fire(
            'No puede continuar',
            'Primero debe completar todos los campos',
            'error'
         );

      }
   }

   if(access_token){
      let config = {
         method: 'get',
         url: API + 'user',
         headers: { 
           'Authorization': 'Bearer ' + access_token
         }
      };
       
       axios(config).then((response) => {
         if(response.data){
            history.push(`/cat/auth/dashboard/${response.data.cod_cliente}`)
         }
       }).catch((error) => {
         console.log(error);
       });
   }

   return (
      <div className="homepage-5 accounts inner-pages">
         <div className="main">
            <section id="home" className="section welcome-area h-100vh bg-overlay d-flex align-items-center">
               <div className="container">
                  <div className="row align-items-center justify-content-center">
                     {/* Welcome Intro Start */}
                     <div className="col-12 col-lg-7">
                        <div className="welcome-intro">
                           <h1 className="text-white">{initData.heading}</h1>
                           <p className="text-white my-4">{initData.content}</p>
                        </div>
                     </div>
                     <div className="col-12 col-md-8 col-lg-5">
                        {/* Contact Box */}
                        <div className="contact-box bg-white text-center rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg">
                           {/* Contact Form */}
                           <form id="contact-form" onSubmit={formSubmit}>
                              <div className="contact-top">
                                 <h3 className="contact-title">{initData.formHeading}</h3>
                                 <h5 className="text-secondary fw-3 py-3">{initData.formContent}</h5>
                              </div>
                              <div className="row">
                                 <div className="col-12">
                                    <div className="form-group">
                                       <div className="input-group">
                                          <div className="input-group-prepend">
                                             <span className="input-group-text"><i className="fas fa-user-shield" /></span>
                                          </div>
                                          <input type="text" className="form-control" name="cod_cliente" placeholder="Codigo de Cliente" required="required" />
                                       </div>
                                    </div>
                                    <div className="form-group">
                                       <div className="input-group">
                                          <div className="input-group-prepend">
                                             <span className="input-group-text"><i className="fas fa-unlock-alt" /></span>
                                          </div>
                                          <input type="password" className="form-control" name="password" placeholder="Contraseña" required="required" />
                                       </div>
                                    </div>
                                    <div className="form-check" style={{ textAlign: 'left' }}>
                                       <input type="checkbox" className="form-check-input" name="chbx_rememberme"
                                          value={chbxRemember}
                                          onChange={() => setChbxRemember(!chbxRemember)} />
                                       <label className="form-check-label">Recuerdame</label>
                                    </div>
                                 </div>
                                 <div className="col-12">
                                    {
                                       loading ?
                                          <button className="btn btn-bordered w-100 mt-3 mt-sm-4" type="submit"><Spinner animation="border" /></button>
                                          :
                                          <button className="btn btn-bordered w-100 mt-3 mt-sm-4" type="submit">{initData.btnText}</button>
                                    }
                                    <div className="contact-bottom">
                                       <span className="d-inline-block mt-3">Si no recuerda sus credenciales, favor contactarse con su administrador.</span>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Shape Bottom */}
               <div className="shape-bottom">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                     <path className="shape-fill" fill="#FFFFFF" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7  c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4  c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                  </svg>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Login;