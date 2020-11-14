import React, {useState} from 'react';
import { Button, Row} from 'react-bootstrap';
import DataTable from 'react-data-table-component';



const MisCategorias = ({userInfo}) => {
    const [showAgregarClientes, setShowAgregarClientes] = useState(false);
    
    const columns = [
        {
        name: 'Habilitado',
        selector: 'habilitado',
        sortable: true,
        },
        {
        name: 'Nombre',
        selector: 'nombre_categoria',
        sortable: true,
        },
        {
        name: 'Idioma',
        selector: 'idioma',
        sortable: true,
        },
        {
        name: 'Tipo',
        selector: 'tipo_categoria',
        sortable: true
        },
        {
        name: 'archivo',
        button: true,
        cell: row => <a className='link_tabla' onClick={() => console.log(row)} href={row.url_externa ? row.url_externa : row.ruta_archivo} target="_blank">Ver</a>
        }
    ];
    
    return (
        <div className='dash_content'>
            <Row>
                <h1>Mis Categorías:</h1>
            </Row>
            <DataTable
                columns={columns}
                data={userInfo.categorias}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                pagination
                paginationRowsPerPageOptions={[20, 40, 50, 100]}
                paginationComponentOptions={{rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todo'}}
                subHeader
                persistTableHead
                highlightOnHover
            />
        </div>
    )
}
 
export default MisCategorias;