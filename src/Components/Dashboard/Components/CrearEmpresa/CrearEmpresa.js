import React, {useState} from 'react';
import { Form, Button, Modal, Col, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import empresasStyles from './Empresas.module.scss';
import Swal from 'sweetalert2'


const CrearEmpresa = ({show, onHide}) => {
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    let images = [];
    let fileArray = [];

    const handleResetForm = () => {
        document.getElementById('myForm').reset();
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
    //Función que borra un elemento del array que contiene las imagenes agregadas en el formulario.
    const deleteImage = (e, name) => {
        e.preventDefault();
        setImage(image.filter((image) => image !== name))

    }
    const onFormSubmit = e => {
        e.preventDefault();

        let info_empresa;
        const {cod_empresa, cod_cliente, password } = e.target.elements;
        if(files.length > 1){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede subir más de una imágen por empresa.'
            })
        }else{
            info_empresa = {
                cod_empresa: cod_empresa.value.trim(),
                cod_cliente: cod_cliente.value.trim(),
                password: password.value.trim(),
                logo: files[0]
            };

            console.log(info_empresa);
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={onFormSubmit} id='myForm'>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Código Empresa:</Form.Label>
                            <Form.Control name='cod_empresa' type="text" placeholder="código de la empresa." />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Código Cliente:</Form.Label>
                            <Form.Control name='cod_cliente' type="text" placeholder="Código del cliente    ." />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control name='password' type='text' placeholder="Contraseña de la Empresa." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Logo:</Form.Label>
                        <div className='custom-file' style={{ marginBottom: '12px' }}>
                            <input type="file" className={'custom-file-input'} id="customFile" onChange={orientImage} accept="image/*" multiple />
                            <label className="custom-file-label" htmlFor="customFile">Buscar Imágen</label>
                        </div>
                        { /* Consultamos que existan elementos en el hook image, y despues recorremos este */
                        image ? 
                            (<div>
                                <div className={empresasStyles.containerImg}>
                                    {(image || []).map((url, i) => {
                                        return (
                                            <div key={i}>
                                                <div className={empresasStyles.boxImg} key={i}>
                                                    <img src={url} alt="..." />
                                                    <div className={empresasStyles.optionImg}>
                                                        <button onClick={(e) => deleteImage(e, url)} className={empresasStyles.deleteImg}>
                                                            <svg className={empresasStyles.svgX} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <ProgressBar variant="success" now={progress} />
                            </div>)
                            :
                            null
                        }
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background:'#007bff'}} type="submit" block>
                        {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                    </Button>
                </Modal.Footer>
                    <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} dismissible>
                        Usuario creado con éxito!
                    </Alert>
            </Form>
        </Modal>
    );
}
 
export default CrearEmpresa;