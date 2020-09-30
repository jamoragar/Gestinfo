import React from 'react';
import {ListGroup, Modal} from 'react-bootstrap';

const Opciones = (props) => {
    console.log(props)
    const {show, onHide, data} = props;

    let categoria = data;

    return (
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>{categoria.nombre_categoria}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item style={{fontSize: '19px', textAlign: 'justify'}}>{categoria.opcion}</ListGroup.Item>
                    <ListGroup.Item style={{textAlign: 'end', fontSize: '20px'}}>$ {parseInt(categoria.valor)}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}
 
export default Opciones;