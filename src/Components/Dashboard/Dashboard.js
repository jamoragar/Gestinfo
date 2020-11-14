import React, {useState, useEffect} from 'react';
import { useParams, BrowserRouter, Switch, Route } from 'react-router-dom';
import MiPerfil from './Components/MiPerfil/MiPerfil';
import CrearEmpresa from './Components/CrearEmpresa/CrearEmpresa';
import MisClientes from './Components/MisClientes/MisClientes';
import CrearCategoria from './Components/CrearCategoria/CrearCategoria';
import MisCategorias from './Components/MisCategorias/MisCategorias';
import SideNav from './Components/SideNav/SideNav';
import axios from 'axios';
import './Dashboard.css';


const Dashboard = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  //URL Desarrollo
   // const API = 'http://localhost:8000/api/login';
   const API = 'https://www.cartaenqr.cl/api/api/'; 

  useEffect(() => {
    const formData = new FormData();
        formData.append('id_cliente', id);
        
        axios(API + 'info-cliente', {
            method: 'POST',
            mode: 'no-cors',
            header: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(response => {
            if(response.data !== 'not_found'){
                setUserInfo(response.data)
            }else{
              setUserInfo('nothing')
            }
        }).catch(err => {
          console.log(err);
        })
  },[]);

  if(userInfo){
    console.log(userInfo)
    if(userInfo.info_cliente.habilitado){
      console.log('usuario habilitado')
      return (
        <BrowserRouter>
          <SideNav id={id} userInfo={userInfo}/>
          <Switch>
            {(userInfo.info_cliente.super) ? 
              (
                <>
                <Route exact path="/cat/auth/dashboard/:id" component={() => <MiPerfil userInfo={userInfo} />}  />

                <Route exact path="/cat/auth/dashboard/:id/misClientes" component={MisClientes} />
                <Route exact path="/cat/auth/dashboard/:id/crearEmpresa" component={CrearEmpresa} />
                </>
              )
              :
              (
                <>
                <Route exact path="/cat/auth/dashboard/:id" component={() => <MiPerfil userInfo={userInfo} />} />
                <Route exact path="/cat/auth/dashboard/:id/crearCategoria" component={CrearCategoria} />
                <Route exact path="/cat/auth/dashboard/:id/misCategorias" component={() => <MisCategorias userInfo={userInfo} />} />
                </>
              ) 
            } 
          </Switch>
        </BrowserRouter>
      );
    }else{
      return(
        <div className='dash_content'>
          <h1 className='titulo_grande'>Perfil no habilitado, por favor regularice su situación y vuelva a intentar</h1>
          <h4 className='titulo_mediano'>Escribanos a contacto@cartaenqr.cl</h4>
        </div>
      );
    }
  }else if(userInfo === 'nothing'){
    return(
        <h2>404 Not Found...</h2>
    )
  }else{
      return(
          <h1>loading...</h1>
      )
  }
  
}

export default Dashboard;