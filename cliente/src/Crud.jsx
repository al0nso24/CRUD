import { useEffect, useState } from "react"
import Axios from "axios"
import Swal from 'sweetalert2'

export default function Crud(){
    const [id, setId] = useState();

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState();
    const [pais, setPais] = useState("");
    const [cargo, setCargo] = useState("");
    const [sueldo, setSueldo] = useState();

    const [actualizar, setActualizar] = useState(false);

    const [listaEmp, setListaEmp] = useState([]);
    const [existe, setExiste] = useState(false); //Para validar si existen datos o no.


    const agregar = (e) => {
        e.preventDefault(); //Para que no se reinicie la página al completar el form.
        Axios.post("http://localhost:3001/nuevoEmpleado",
            {
                nombre: nombre, edad: edad, pais: pais, cargo: cargo, sueldo: sueldo
            }).then((res) => {
                getEmpleados();
                Swal.fire({
                    text: "Emlpleado registrado!",
                    icon: "success",
                    draggable: true
                });
                limpiarCampos();

            }).catch(function(error){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo agregar el empleado.",
                    footer: JSON.parse(JSON.stringify(error)).message
                });
            })

    }

    const getEmpleados = () =>{
        Axios.get("http://localhost:3001/listarEmpleados").then((res) => {
            setListaEmp(res.data);
            setExiste(true);
        });
    }

    //"e" es el objeto del empleado (contiene id, nombre, edad y los demás datos).
    //e.id indica cuál empleado eliminar en la base de datos.
    const deleteEmpleado = (e) => {
        Swal.fire({
            title: "Eliminar?",
            text: "Quieres eliminar a "+e.nombre+"?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/borrarEmpleado/${e.id}`).then((res) => {
                    getEmpleados();
                    Swal.fire({
                        title: "Borrado!",
                        text: `El empleado ${e.nombre} fue eliminado correctamente.`,
                        icon: "success"
                    })

                }).catch(function(error){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se pudo borrar el empleado.",
                        footer: JSON.parse(JSON.stringify(error)).message
                    });
                })
            }
        });
    }

    //BOTÓN ACTUALIZAR:
    //1er Paso:
    //Esto recupera los datos y los pone en los inputs a la hora de darle a "Actualizar".
    const recuperarDatos = (e) =>{
        setActualizar(true);
        setId(e.id);
        setNombre(e.nombre);
        setEdad(e.edad);
        setPais(e.pais);
        setCargo(e.cargo);
        setSueldo(e.sueldo);
    }

    //2do Paso:
    //Aquí ya empieza la actualización de datos.
    const actualizarEmp = (id) =>{
        Axios.put(`http://localhost:3001/actualizar/${id}`, {
            nombre:nombre, edad:edad, pais:pais, cargo:cargo, sueldo:sueldo
        }).then((res)=>{
            getEmpleados()
            Swal.fire({
                text: "Emlpleado actualizado!",
                icon: "success",
                draggable: true
            });
            limpiarCampos();

        }).catch(function(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo actualizar al empleado.",
                footer: JSON.parse(JSON.stringify(error)).message
            });
        })
    }

    //Actualiza automáticamente la lista.
    useEffect(()=>{
        getEmpleados();
    }, []);

    const limpiarCampos = () =>{
        setNombre("");
        setEdad("");
        setPais("");
        setCargo("");
        setSueldo("");
        setActualizar(false); //Al darle al botón "Cancelar" vuelve el de Agregar.
    }


    return (
        <div className="p-3">
            <div className="container mb-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <form onSubmit={agregar}>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Nombre</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                    value={nombre} onChange={(e) => setNombre(e.target.value)} required
                                ></input>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Edad</span>
                                <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                    value={edad} onChange={(e) => setEdad(e.target.value)} required
                                ></input>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">País</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                    value={pais} onChange={(e) => setPais(e.target.value)} required
                                ></input>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Cargo</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                    value={cargo} onChange={(e) => setCargo(e.target.value)} required
                                ></input>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Sueldo (S/.)</span>
                                <input class="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                    value={sueldo} onChange={(e) => setSueldo(e.target.value)} required
                                ></input>
                            </div>
                            {
                                actualizar?
                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn btn-secondary" type="button" onClick={()=>actualizarEmp(id)}>Actualizar</button>
                                    <button className="btn btn-danger" type="button" onClick={limpiarCampos}>Cancelar</button>
                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary">Agregar</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                        {
                            listaEmp.length > 0 ?(
                                <>
                                    <p><b>Número de Empleados:</b> <span>{listaEmp.length}</span></p>
                                    <table class="table table-striped">
                                        <thead className="text-center table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Edad</th>
                                                <th>País</th>
                                                <th>Cargo</th>
                                                <th>Sueldo</th>
                                                <th>IGV</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {
                                                listaEmp.map((e, key) => (
                                                    <tr key={e.id}>
                                                        <td>{e.id}</td>
                                                        <td>{e.nombre}</td>
                                                        <td>{e.edad}</td>
                                                        <td>{e.pais}</td>
                                                        <td>{e.cargo}</td>
                                                        <td>S/. {e.sueldo}</td>
                                                        <td>{e.igv.toFixed(2)}</td>
                                                        <td>
                                                            <div class="d-flex gap-3 justify-content-center">
                                                                <button class="btn btn-danger" onClick={() => deleteEmpleado(e)} type="button">Eliminar</button>
                                                                <button class="btn btn-secondary" onClick={() => recuperarDatos(e)} type="button">Actualizar</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </>
                            ):(
                                existe&& (
                                    <p>Aún no hay empleados registrados en la tabla 😢</p>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}