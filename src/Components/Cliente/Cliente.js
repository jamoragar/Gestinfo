import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Archivo from '../Archivo/Archivo';
import Opciones from '../Opciones/Opciones';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import './main.css';
import './util.css';

const Cliente = () => {
    // const API = 'http://localhost:8000/info-cliente';
    const API = 'https://www.cartaenqr.cl/api/info-cliente';

    const [dataCliente, setDataCliente] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [catFiltrada, setCatFiltrada] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categoriaHook, setCategoriaHook] = useState(null);
    const [modalOpciones, setModalOpciones] = useState(false);
    let { id } = useParams();
    
    
    
    useEffect(() => {
        // setLoading(true);
        
        const formData = new FormData();
        formData.append('id_cliente', id);
        
        axios(API, {
            method: 'POST',
            mode: 'no-cors',
            header: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(response => {
            if(response.data !== 'not_found'){
                setCatFiltrada(filterArray(response.data.categorias, response.data.categorias[0].idioma));
                setDataCliente(response.data)
            }else{
                setDataCliente('nothing')
            }
            
        })
        
        // setTimeout(() => {
            //     setLoading(false)
            // }, 3000)
        }, []);

    const filterArray = (array, argumento) => {
        let filtro = array.filter((e) => {
            return(e.idioma === argumento)
        })
        return filtro;
    }
    
    const aplicaFiltro = (array, criteria) => {
        console.log(filterArray(array, criteria))
        setCatFiltrada(filterArray(array, criteria));
    }
    const handleCategoria = (categoria) =>{
        if(categoria.tipo_categoria === 'archivo' || categoria.tipo_categoria === 'imagen'){
            console.log(categoria)
            setCategoriaHook(categoria)
            setShowModal(true);
        }else{
            setCategoriaHook(categoria);
            setModalOpciones(true);
        }
    }

    if(dataCliente != 'nothing'){
        console.log(dataCliente)
        if(dataCliente.categorias){
            let final = [...dataCliente.categorias.reduce((op, inp) => {
                let idioma = inp.idioma
                op.set(idioma, (op.get(idioma) || 0) + 1)
                return op
            }, new Map()).entries()].filter(([_,repeat]) => repeat >= 1).map(([idioma, repeat]) => ({ idioma, repeat}))

            return (
                <>
                <Helmet>
                    <title>{ dataCliente.info_cliente.nombre_cliente }</title>
                </Helmet>
                <nav className='navCategoria' style={{width: '100%', background:dataCliente.info_cliente.color_final ? dataCliente.info_cliente.color_final: '#e98b41', color:'white'}}>
                    <ul className="nav justify-content-center">
                        {final.map((idiomas, i) => {
                            return(
                                <li key={i} className="nav-item">
                                    <div className='d-inline p-4 cursor_idioma' key={i} onClick={() => aplicaFiltro(dataCliente.categorias, idiomas.idioma)}>{idiomas.idioma}</div>
                                    {final.length - 1 !== i ? '|' : null}
                                </li>
                            )
                        })}
                    </ul>
                    <img className='logo_cartaqr rounded mx-auto d-block' src={dataCliente.logo} alt='Tu Carta en QR' />
                    <span className="contact100-form-title" style={{marginTop: '15px', color:'white'}}>
                        {dataCliente.info_cliente.nombre_cliente}   
                    </span>
                </nav>
                <div className="container-contact100" style={
                    {background:`linear-gradient(-360deg, ${dataCliente.info_cliente.color_inicial ? dataCliente.info_cliente.color_inicial : '#fddece'} 0%, ${dataCliente.info_cliente.color_final ? dataCliente.info_cliente.color_final : '#e98b41'} 100%)`}
                    }>
                    <div className="wrap-contact100">
                        <form className="contact100-form validate-form">
                            <div className='idioma'>
                            </div>
                            <br />
                            <br />
                            {
                                catFiltrada.map((categoria, i) => {
                                    if(categoria.habilitado === 'ON'){
                                        if(categoria.tipo_categoria === 'archivo'){
                                            return(
                                                <div key={i} className="wrap-input100 validate-input" data-validate="El nombre es requerido" >
                                                    <button onClick={() => handleCategoria(categoria)} type="button" className="btn btn-light btn-lg" style={{width: '100%', background: 'rgb(236 236 236)', color:'black'}}>{categoria.nombre_categoria}</button>
                                                </div>
                                            )
                                        }else if(categoria.tipo_categoria === 'url'){
                                            return(
                                                <div key={i} className="wrap-input100 validate-input" data-validate="El nombre es requerido">
                                                    <a href={categoria.url_externa}><button type="button" className="btn btn-light btn-lg" style={{width: '100%', background: 'rgb(236 236 236)', color:'black'}}>{categoria.nombre_categoria}</button></a>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div key={i} className="wrap-input100 validate-input" data-validate="El nombre es requerido">
                                                    <button onClick={() => handleCategoria(categoria)} type="button" className="btn btn-light btn-lg" style={{width: '100%', background: 'rgb(236 236 236)', color:'black'}}>{categoria.nombre_categoria}</button>
                                                </div>
                                            )
                                        }
                                    }
                                })
                            }
                        </form>
                    </div>
                </div>
                {categoriaHook ? <Archivo show={showModal} onHide={() => setShowModal(false)} data={categoriaHook} /> : null}
                {categoriaHook ? <Opciones show={modalOpciones} onHide={() => setModalOpciones(false)} data={categoriaHook} /> : null}
                </>
            );
        }else{
            return(
                <h1>Loading...</h1>
            )
        }
                    
    }else if(dataCliente === 'nothing'){
        return(
            <h2>404 Not Found...</h2>
        )
    }else{
        return(
            <h1>loading...</h1>
        )
    }
}
 
export default Cliente;