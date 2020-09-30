import React from 'react';
import {Modal} from 'react-bootstrap';
import PDFViewer from 'pdf-viewer-reactjs'

const Archivo = (props) => {
    const {show, onHide, data} = props;

    let categoria = data;

    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{categoria.nombre_categoria}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    categoria.tipo_categoria === 'imagen' ? 
                        <img src={categoria.ruta_archivo} alt='carta en qr'/>
                    :
                    categoria.tipo_categoria === 'url' ?
                        window.open(categoria.url_externa)
                        :
                        <PDFViewer
                            document={{
                                url: categoria.ruta_archivo,
                            }}
                            hideZoom
                            // hideRotation
                            // hideNavbar
                        />

                }
                
            </Modal.Body>
        </Modal>
    );
}
 
export default Archivo;