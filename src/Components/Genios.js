import React, { Component } from 'react';
import { GeniosData } from '../dataLocal';
import './Genios.css';
class Genios extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaGenios: [],
            genioSeleccionado: "",
            ganadorSorteo: ""
        }
    }

    componentDidMount(){
        let aleatorio = Math.floor(Math.random()*GeniosData.length)
        this.setState({
            listaGenios: GeniosData,
            ganadorSorteo: GeniosData[aleatorio]
        })
        
    }

    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombres</th>
                        <th>Cargo</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemGenio => 
                        <tr key={itemGenio.id}
                        id={"tr-genio-" + itemGenio.id}
                        onClick={() => this.seleccionarGenio(itemGenio)}>
                            <td>{itemGenio.id}</td>
                            <td>{itemGenio.nombres}</td>
                            <td>{itemGenio.cargo}</td>
                            <td>{itemGenio.ciudad}</td>
                        </tr>
                    )}    

                </tbody>
            </table>
        )
    }

    seleccionarGenio(itemGenio){
        console.log(itemGenio);
        if(this.state.genioSeleccionado !== ""){
            document.getElementById("tr-genio-" + this.state.genioSeleccionado.id).classList.remove("table-info");
        }
        this.setState({
            genioSeleccionado: itemGenio
        }) 
        document.getElementById("tr-genio-" + itemGenio.id).classList.add("table-info");

    }

    mostrarGenioSeleccionado(){
        var genio = this.state.genioSeleccionado
        return(
            <div>
                <img src={require('./../' + genio.foto).default} className="img-fluid" alt=""/>
                <h3>{genio.nombres}</h3>
                <h4>{genio.cargo}</h4>
                <p>{genio.nombres}</p>
            </div>
        )            
    }

    mensajeColaborador(){
        return(
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, aut in suscipit illum cum sit fugiat molestiae dolorem distinctio? Suscipit iure at, quia nisi voluptatibus labore eligendi repellat cum cupiditate?
            </p>
        )
    }

    render() {
        let titulo = <h2>Genios</h2>
        let mensaje = this.mensajeColaborador()
        let contenidoTabla = this.dibujarTabla(this.state.listaGenios)
        let contenidoGenio = this.state.genioSeleccionado !== ""
            ? this.mostrarGenioSeleccionado()
            : null
        let nombreGanador = this.state.ganadorSorteo.nombres    
        return (
            <section className="padded" id="genios">
                <div className="container">
                    {titulo}
                    {mensaje}
                    <div className="row">
                        <div className="col-md-8">
                            {contenidoTabla}
                            El ganador del sorteo es: <strong>{nombreGanador} </strong>
                            ({this.state.ganadorSorteo.cargo})
                        </div>
                        <div className="col-md-4">
                            {contenidoGenio}
                        </div>
                    </div>
                </div>                    
            </section>
        );
    }
}

export default Genios;