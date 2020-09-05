import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import CrearEmpresa from '../CrearEmpresa/CrearEmpresa';
import {Spinner, Button, Row} from 'react-bootstrap';

const MisClientes = () => {
    const [showAgregarClientes, setShowAgregarClientes] = useState(false);
    
    const columns = [
        {
        name: 'Nombre',
        selector: 'title',
        sortable: true,
        },
        {
        name: 'ID',
        selector: 'director',
        sortable: true,
        },
        {
        name: 'Fecha de Creación',
        selector: 'year',
        sortable: true,
        },
    ];
    return (
        <div className='dash_content'>
            <Row>
                <h1>Clientes:</h1>
                <Button className='ml-auto' style={{background:'#28a745'}} onClick={() => setShowAgregarClientes(!showAgregarClientes)}>Crear Nuevo Cliente</Button>
            </Row>
            <DataTable
                columns={columns}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                pagination
                paginationRowsPerPageOptions={[20, 40, 50, 100]}
                paginationComponentOptions={{rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todo'}}
                subHeader
                persistTableHead
                highlightOnHover
            />
            <CrearEmpresa show={showAgregarClientes} onHide={() => setShowAgregarClientes(false)} />
        </div>
    );
}
 
export default MisClientes;