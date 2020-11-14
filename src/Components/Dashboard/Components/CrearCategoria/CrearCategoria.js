import React, {useState} from 'react';
import { Form, Button, Modal, Col, Row, Spinner, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';



const CrearCategoria = () => {
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [checkbox, setCheckBox] = useState('');
    const [files, setFiles] = useState(null);
    const [valorState, setValorState] = useState({value: 0});



    const handleResetForm = () => {
        console.log('reset form...')
        document.getElementById('myForm').reset();
    }
    const handleChange = (e) => {  
        setCheckBox(e);
    }
    const onFormSubmit = e => {
        e.preventDefault();

        const {idioma, nom_categoria, text_area_opcion, valor_opcion } = e.target.elements;
        let formData = new FormData();

        if(idioma.value && nom_categoria.value){
            if(files.length >= 1){

                formData.append('idioma', idioma.value);
                formData.append('nombre_categoria', nom_categoria.value.trim());
                formData.append('file', files[0]);

                console.log(formData)
                axios.post('http://127.0.0.1:8000/api/crear_categoria', formData)
                    .then(result => console.log(result))
            }else if(text_area_opcion.value != '' && valor_opcion.value != ''){
                formData = {
                    idioma: idioma.value,
                    nombre_categoria: nom_categoria.value.trim(),
                    opcion: text_area_opcion.value.trim(),
                    valor_opcion: valor_opcion.value
                }
                console.log(formData)
                axios.post('http://127.0.0.1:8000/api/crear_categoria', formData)
                    .then(result => console.log(result))
            }else{
                Swal.fire(
                    'Un momento...',
                    'Debe completar todos los campos antes de continuar',
                    'error'
                )
            }
            
            
        }else{
            Swal.fire(
                'Un momento...',
                'Debe completar todos los campos antes de continuar',
                'error'
            )
        }


    }
    //Función que recorre los archivos subidos y los transforma en blob para, posteriormente crear un array de estos y previsualizarlos dentro del formulario.
    const orientFile = async ({ target }) => {
        setFiles(target.files)
    }
    const formatFileSize = (bytes, decimalPoint) => {
        if(bytes === 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
     }
    const onChange = (e) =>{
        const re = /^[0-9\b]+$/;
    
        if (e.target.value === '' || re.test(e.target.value)) {
           setValorState({value: e.target.value})
        }
    }

    return (
        <div className='dash_content'>
            <h3>Crear nueva categoría</h3>
            <br />
            <Form onSubmit={onFormSubmit} id='myForm'>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Idioma:</Form.Label>
                        <Form.Control name='idioma' type='text' placeholder='Ingrese el idioma.' />
                        {/* <Form.Control name='idioma' as="select" defaultValue="Asignar Rol">
                            <option value='0'>Seleccionar...</option>
                            <option value='es'>Español</option>
                            <option value='en'>Inglés</option>
                            <option value='de'>Alemán</option>
                            <option value='pt'>Portugues</option>
                            <option value='fr'>Francés</option>
                        </Form.Control> */}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Nombre Categoría: </Form.Label>
                        <Form.Control name='nom_categoria' type='text' placeholder='Ingrese el nombre de la categoría.' />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                        inline
                        name={`check_categoria`}
                        type={'radio'}
                        id={`file`}
                        label={`PDF / Imagen`}
                        defaultChecked
                        onChange={(e) => handleChange(e.target.id)}
                    />
                    <Form.Check
                        inline
                        name={`check_categoria`}
                        type={'radio'}
                        id={`option`}
                        label={`Opción`}
                        onChange={(e) => handleChange(e.target.id)}
                    />
                    <Form.Check
                        inline
                        name={`check_categoria`}
                        type={'radio'}
                        id={`url`}
                        label={`URL`}
                        onChange={(e) => handleChange(e.target.id)}
                    />
                    <br />
                    <br />
                    {(() => {
                        switch (checkbox){
                            case 'url':
                                return(
                                    <>
                                    <Form.Group>
                                        <Form.Label>URL:</Form.Label>
                                        <Form.Control type='text'  name='valor_url' placeholder='http://www...'/>
                                    </Form.Group>
                                    </>
                                );
                            case 'option':
                                return(
                                    <>
                                    <Form.Group>
                                        <Form.Label>Opción:</Form.Label>
                                        <Form.Control as={'textarea'}  name='text_area_opcion' rows='5' />
                                    </Form.Group>
                                    <Form.Label>Valor:</Form.Label>
                                    <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type='text'  name='valor_opcion' aria-describedby="inputGroupPrepend" value={valorState['value']} onChange={onChange}/>
                                    </InputGroup>
                                    </>
                                )
                            default:
                                return  (
                                    <>
                                    <Form.Label>PDF / Imagen:</Form.Label>
                                    <Form.File 
                                        label="Click aquí para buscar archivo"
                                        data-browse="Buscar"
                                        custom
                                        onChange={orientFile}
                                    />
                                    {
                                        files ? <p>Nombre de Archivo: {files[0].name} - Tamaño: {formatFileSize(files[0].size, 2)}</p>
                                        :
                                        null
                                    }   
                                    </>
                                );
                        }
                    })
                    ()}
                </Form.Group>
                <br />
                <br />
                <Row>
                    <Col>
                        <Button style={{background:'#007bff'}} type="submit" block>
                            {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                        </Button>
                    </Col>
                    <Col>
                        <Button style={{background:'#666666'}} onClick={handleResetForm} block>
                            <i className="fas fa-reply-all fa-fw" />Reiniciar Formulario
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
 
export default CrearCategoria;