import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import Productos from './Productos';


class Tienda extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaCategorias: [],
            categoriaSeleccionada: "",
            ganadorSorteo: ""
        }
    }  

    componentDidMount(){ // Parecido al OnInit de Angular
        const rutaServicio = ApiWebUrl + "serviciocategorias.php"
        fetch(rutaServicio)
            .then(res => res.json())
            .then((result) => {
                console.log(result); 
                    this.setState({
                        listaCategorias: result
                    })
                }
            )
    }

    dibujarTabla(datosTabla){
        return(
            <ul className="list-group">
                {datosTabla.map(itemCategoria =>
                    <li className="list-group-item list-group-item-dark" key={itemCategoria.idcategoria} 
                    onClick={() => this.seleccionarCategoria(itemCategoria)}>
                        <h5 className="fw-bold">{itemCategoria.nombre}</h5> 
                        <small>{itemCategoria.descripcion}</small>
                    </li>
                    )}
            </ul>
        )
    }

    seleccionarCategoria(itemCategoria){
        this.setState({
            categoriaSeleccionada: itemCategoria
        })
    }

    render() {
        let contenidoTabla = this.dibujarTabla(this.state.listaCategorias)
        let dibujarComponenteProductos = <Productos categoriaProducto={this.state.categoriaSeleccionada} />
        return (
            <section id="tienda" className="padded">
                <div className="container">
                    <h2>Tienda</h2>
                    <div className="row">
                        <div className="col-md-3">
                            {contenidoTabla}

                        </div>
                        <div className="col-md-9">                            
                            <h4>{this.state.categoriaSeleccionada.nombre}</h4>
                            <h5>{this.state.categoriaSeleccionada.descripcion}</h5>
                            {dibujarComponenteProductos}

                        </div> 
                    </div>
                </div>
            </section>
        );
    }
}

export default Tienda;