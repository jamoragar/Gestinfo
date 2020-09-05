import React from 'react';
import {useParams} from 'react-router-dom';
import './main.css';
import './util.css';

const Cliente = () => {
    let { id } = useParams();
    return (
        <>
        <div className="container-contact100">
            <div className="wrap-contact100">
                <form className="contact100-form validate-form">
                    <span className="contact100-form-title">
                        Bienvenido { id }   
                    </span>

                    <div className="wrap-input100 validate-input" data-validate="El nombre es requerido">
                        <span className="label-input100">Nombre:</span>
                        <input className="input100" type="text" name="name" placeholder="Ingrese su nombre" />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <span className="label-input100">Email:</span>
                        <input className="input100" type="text" name="email" placeholder="Ingrese su e-mail" />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">¿Que servicios necesita?</span>
                        <div>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={e=>console.log(e.target.value)}>
                            <option>Sub-Categoría 1</option>
                            <option>Sub-Categoría 2</option>
                            <option>Sub-Categoría 3</option>
                            <option>Sub-Categoría 4</option>
                            <option>Sub-Categoría 5</option>
                        </select>

                        </div>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Servicios:</span>
                        <div>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={e=>console.log(e.target.value)}>
                                <option>Categoría 1</option>
                                <option>Categoría 2</option>
                                <option>Categoría 3</option>
                                <option>Categoría 4</option>
                                <option>Categoría 5</option>
                            </select>
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                </form>
            </div>
	    </div>
        <div id="dropDownSelect1"></div>
        </>
    );
}
 
export default Cliente;