import React, {useState} from 'react';
import { Form, Button, Modal, Col, Alert, Spinner } from 'react-bootstrap';


const CrearCategoria = () => {
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);

    const handleResetForm = () => {
        document.getElementById('myForm').reset();
    }
    const onFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='dash_content'>
            <Form onSubmit={onFormSubmit} id='myForm'>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Idioma:</Form.Label>
                            <Form.Control name='rol' as="select" defaultValue="Asignar Rol">
                                <option value='0'>Seleccionar...</option>
                                <option value='User'>Español</option>
                                <option value='Company'>Inglés</option>
                                <option value='Leo/Leon'>Alemán</option>
                                <option value='Externo'>Portugues</option>
                                <option value='Externo'>Francés</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Ingrese el nombre de la categoría." />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Sección:</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Ingrese la sección a cual pertenece." />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Categoría:</Form.Label>
                        <Form.Control name='nombre' type='text' placeholder="Ingrese el valor...." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opción:</Form.Label>
                        <Form.Control name='apellido' type='text' placeholder="Ingrese el valor..." />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background:'#007bff'}} type="submit" block>
                        {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                    </Button>
                </Modal.Footer>
                    <Alert show={alertShow} style={'success'} onClose={() => setAlertShow(false)} dismissible>
                        Usuario creado con éxito!
                    </Alert>
            </Form>
        </div>
    );
}
 
export default CrearCategoria;