import React, { useEffect, useState } from 'react';
import { ApiUrlXD } from '../../const/global';
import './Directori.css'
import { FaSearch } from "react-icons/fa";

import PerfilSuper from '../../pages Admin/PerfilUsuario/PerfilSuper'
import { Link, useNavigate } from 'react-router-dom';

function Directorio() {
    const [datSupUs, setDatSupUs] = useState();
    const [buscNombre, setBuscNombre] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        fetch(ApiUrlXD + `getAllSuperUs/${buscNombre}`)
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                setDatSupUs(json);
            })

    }, [buscNombre])



    return (
        <div className="container-directorio">
            {/*
            <div className="title-entre">
                <h1>Supervisores</h1>
            </div>
    */}
            <div className='buscador'>
                <FaSearch />
                <input type="text" placeholder="Nombre del Supervisor" className='buscaDirect' onChange={(e) => {
                    setBuscNombre(e.target.value);

                }}></input>
            </div>

            <div className="contentre">
                <div className="scrolltable1">


                    <table className="table">

                        <thead className="encabetable">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Planta</th>
                            </tr>
                        </thead>
                        <tbody className="cuerpotable">


                            {datSupUs &&
                                datSupUs.usSu.map(({ Nombre, Correo, Planta, Usuario_ID }) => (

                                    <tr key={Usuario_ID} className="rowDir"
                                        onClick={() => { navigate("/perfilSuper", { state: { usid: Usuario_ID } }) }}
                                    >
                                        <th scope="col">{Nombre}</th>
                                        <td scope="col">{Correo}</td>
                                        <td scope="col">{Planta}</td>
                                    </tr>

                                ))}


                        </tbody>


                    </table>



                </div>
            </div>
        </div>
    );
}

export default Directorio;