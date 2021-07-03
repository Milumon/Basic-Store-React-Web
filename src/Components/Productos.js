import React, {Component} from 'react';
import { ApiWebUrl } from '../utils';

class Productos extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaProductos: []
        }
    }  

    componentWillReceiveProps(props){
            console.log("console del props ",props.categoriaProducto)
            if(props.categoriaProducto){
                this.obtenerProductosPorCategoria(props.categoriaProducto)
            }
    }

    obtenerProductosPorCategoria(itemCategoria){
        const rutaServicio = ApiWebUrl + "servicioproductos.php"
        console.log("ruta ",rutaServicio)
        var formData = new FormData();
        formData.append("caty", itemCategoria.idcategoria)

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                console.log("listado productos ", result); 
                    this.setState({
                        listaProductos: result
                    })
                }
            )
    }

    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombres</th>
                        <th>Detalle</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemProducto => 
                        <tr key={itemProducto.idproducto}>                      
                            <td>{itemProducto.idproducto}</td>
                            <td>{itemProducto.nombre}</td>
                            <td>{itemProducto.detalle}</td>
                            <td>{itemProducto.precio}</td>
                        </tr>
                    )}    

                </tbody>
            </table>
        )
    }

    render(){
        let contenidoTabla = this.dibujarTabla(this.state.listaProductos)
         return(
            <div>
                {contenidoTabla}
            </div>
        )
    }

}


export default Productos;