import React, {useState, useEffect} from 'react';
import { Form, Button, Modal, Col, Row, Spinner, InputGroup, ProgressBar } from 'react-bootstrap';
import InputColor from 'react-input-color';
import Swal from 'sweetalert2';
import '../../Dashboard.css';
import empresasStyles from '../CrearEmpresa/Empresas.module.scss';

const MiPerfil = ({userInfo}) => {
    
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [colorInicial, setColorInicial] = useState('');
    const [colorFinal, setColorFinal] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);


    let images = [];
    let fileArray = [];

    //Función que borra un elemento del array que contiene las imagenes agregadas en el formulario.
    const deleteImage = (e, name) => {
        e.preventDefault();
        setImage(image.filter((image) => image !== name))

    }
    //Función que recorre los archivos subidos y los transforma en blob para, posteriormente crear un array de estos y previsualizarlos dentro del formulario.
    const orientImage = async ({ target }) => {
        images.push(target.files)
        setFiles(target.files)
        for (let i = 0; i < images[0].length; i++) {
            fileArray.push(URL.createObjectURL(images[0][i]));
        }
        setImage(await fileArray);
    }
    const handleResetForm = () => {
        console.log('reset form...')
        document.getElementById('myForm').reset();
    }
    const onFormSubmit = e => {
        e.preventDefault();
        const {nombre_cliente, email, password} = e.target.elements;

        let data = {
            nombre_cliente: nombre_cliente.value.trim(),
            cod_cliente: userInfo.info_cliente.cod_cliente,
            email: email.value.trim(),
            password: password.value.trim(),
            color_inicial: colorInicial.hex,
            color_final: colorFinal.hex
        };


        if(password.value.length > 0){
            Swal.fire({
                icon: 'warning',
                title: 'Cambio de Contraseña.',
                text: '¿Esta seguro que desea cambiar su contraseña?',
                showDenyButton: true,
                confirmButtonText: `Aceptar`,
                denyButtonText: `Cancelar`,
            }).then(res => {
                if(res.isConfirmed){
                    console.log('confirmada');
                }else if(res.isDenied){
                    console.log('rechazada');
                }
            });
        }
        console.log(data)
    }


    return (
        <div className='dash_content'>
            <h3 className='titulo_mediano'>Información de Cliente:</h3>
            <br />
            <Form onSubmit={onFormSubmit} id='myForm'>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nombre: (*)</Form.Label>
                        <Form.Control name='nombre_cliente' type='text' placeholder='Ingrese el Nombre.' defaultValue={userInfo.info_cliente.nombre_cliente} required />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Código QR: </Form.Label>
                        <Form.Control name='cod_cliente' type='text' defaultValue={userInfo.info_cliente.cod_cliente} readOnly />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email: (*)</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Ingrese el idioma.' defaultValue={userInfo.info_cliente.nombre_cliente} required />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control name='password' type={showPass ? "text" : "password"} placeholder='Ingrese su nueva contraseña.' />
                        <Form.Check type="checkbox" label="Ver Contraseña" onChange={() => setShowPass(!showPass)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Color Inicial:</Form.Label>
                        <Form.Control name='color_inicial' type='text' placeholder='Ingrese el código hexadecimal del color inicial.' value={colorInicial.hex}/>
                        <InputColor initialValue={userInfo.info_cliente.color_final ? userInfo.info_cliente.color_final : ''} onChange={setColorInicial} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Color Final:</Form.Label>
                        <Form.Control name='color_inicial' type='text' placeholder='Ingrese el código hexadecimal del color final.'  value={colorFinal.hex} />
                        <InputColor initialValue={userInfo.info_cliente.color_inicial ? userInfo.info_cliente.color_inicial : ''} onChange={setColorFinal} />
                    </Form.Group>
                </Form.Row>
                <Row>
                    <Button style={{background:'#007bff'}} type="submit" block>
                        {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Actualizar</>) : (<Spinner animation="border" />)}
                    </Button>
                </Row>
            </Form>
        </div>
    );
}
 
export default MiPerfil;