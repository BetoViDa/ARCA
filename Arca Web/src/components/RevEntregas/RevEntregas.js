import React from 'react'
import { ApiUrlXD } from '../../const/global'

// para el popup que muestra las instrucciones del entregable 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//importamos las imagenes de medallas
import medBron from './img/medallabronce.png'
import medPla from './img/medallaplata.png'
import medOro from './img/medallaoro.png'
import medNada from './img/candado.png'
import ini from './img/inicio.png'
import { useState } from 'react';
import { useEffect } from 'react';

function RevEntregas(props) {
    const idU = props.usId;

    const [datSubNiv, setDatSubNiv] = useState();

    const [certiBron, setCertiBron] = useState();
    const [certiPla, setCertiPla] = useState();
    const [certiOr, setCertiOr] = useState();

    function verifFecha(xd) {

        if (xd === null) {
            return "---"
        }
        return xd.slice(0, -14)

    }

    function veriBotonEntrega(rev, pVid) {
        let c;
        if(rev == 1){
             c="green"
        }
        else{
             c="red"
        }


        if (pVid < 70) {
            return (
               <button disabled>Calificar</button>
            );
        }
        
        
        return(
            <button style={{color: c}} >
                Calificar
            </button>
        )
        


    }


    function verEntrega(rev, pVid, color, elemento, arch) {

        if (pVid < 70) {
            return (
                <p style={{ color: "grey" }}>{color}  {elemento} </p>
            );
        }

        if (rev == 1) {
            return (
                <a href={arch} target="_blank" style={{ color: "green" }}>{color}  {elemento} </a>
            );
        }
        else {
            return (
                <a href={arch} target="_blank" style={{ color: "red" }}>{color}  {elemento} </a>
            );
        }

    }

    function verifEntrega(xd) {

        if (xd === null) {
            return "---"
        }
        return xd

    }

    useEffect(() => {

        fetch(ApiUrlXD + `getSupervisor/${idU}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setCertiBron(json.sup[0].CertiBronce);
                setCertiPla(json.sup[0].CertiPlata);
                setCertiOr(json.sup[0].CertiOro);
            })



        let credentials = {
            idU
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }

        fetch(ApiUrlXD + 'getSubNiv', options)
            .then((response) => {
                return response.json();
            })
            .then((actualData) => {
                setDatSubNiv(actualData);
            })

    }, [])

    return (
        <div className="container-entregas">
            <div className="title-entre">
                <center><h1>Entregas</h1></center>
            </div>
            <div className="contentre justify-content-center">
                <div className="scrolltable1">
                    <table className="table">
                        <thead className="encabetable">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>

                                <th scope="col">Calificacion</th>
                                <th scope="col">P. Juego</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">______</th>


                            </tr>

                        </thead>
                        <tbody className="cuerpotable">
                            {datSubNiv &&
                                datSubNiv.subNivel.map(({ Sub_ID, Color, Elemento, PuntajeEntrega, PuntajeVideojuego, Fecha, Comentario, Revisado, Archivo }) => (


                                    <tr key={Sub_ID}>

                                        <th scope="row">{Sub_ID}</th>

                                        <td>{verEntrega(Revisado, PuntajeVideojuego, Color, Elemento, Archivo)}</td>


                                        <td>{PuntajeEntrega}</td>
                                        <td>{verifEntrega(PuntajeVideojuego)}</td>
                                        <td>{verifFecha(Fecha)}</td>


                                        <td>{veriBotonEntrega(Revisado, PuntajeVideojuego)}</td>





                                    </tr>



                                ))}

                        </tbody>
                    </table>


                </div>
            </div>

            <h1 className="title-med-ent">Medallas</h1>

            <div class="container-med-ent">
                <div className="progress-container-med ">
                    {certiBron ? <div className="circle active"><img className='medalla' src={ini} /> <div className="progress" id="uno"></div></div> : <div className="circle active"><img className='medalla' src={ini} /> </div>}
                    {certiBron ? <div className="circle active"><img className='medalla' src={medBron} /> <div className="progress dos" ></div></div> : <div className="circle"><img className='medalla' src={medNada} /> </div>}
                    {certiPla ? <div className="circle active"><img className='medalla' src={medPla} /> <div className="progress tres" ></div></div> : <div className="circle"><img className='medalla' src={medNada} /> </div>}
                    {certiOr ? <div className="circle active"><img className='medalla' src={medOro} /> <div className="progress cuatro" ></div></div> : <div className="circle"><img className='medalla' src={medNada} /> </div>}


                </div>

            </div>


        </div>
    )
}

export default RevEntregas