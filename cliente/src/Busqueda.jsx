import  Axios from "axios";
import { useState } from "react";

export default function Busqueda () {
    const [idempleado, setIdempleado] = useState();
    const [listaBusqueda, setListaBusqueda] = useState([]);
    const [existe, setExiste] = useState(false);

    const buscarEmpleado = (e) => {
        e.preventDefault();
        Axios.get(`http://localhost:3001/busquedaxid/${idempleado}`).then((res)=>{
            setListaBusqueda(res.data);
            setExiste(true);
        })
    }


    return(
        <div className="p-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                        <form onSubmit={buscarEmpleado}>
                            <div className="form-group">
                                <label className="form-label">Código del empleado:</label>
                                <input value={idempleado} onChange={(e)=>setIdempleado(e.target.value)} className="form-control" type="number" required></input>
                            </div>
                            <button className="mt-3 btn btn-success">Buscar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-12 col-xl-12 col-lg-12">
                        {
                            listaBusqueda.length > 0 ? (
                                <>
                                <table class="table table-striped">
                                    <thead className="table-dark fw-bold text-center">
                                            <tr>
                                                <td>Nombre</td>
                                                <td>Edad</td>
                                                <td>País</td>
                                                <td>Cargo</td>
                                                <td>Sueldo</td>
                                                <td>IGV</td>
                                            </tr>
                                    </thead>
                                    <tbody className="text-center">
                                            {
                                                listaBusqueda.map((e, key) => (
                                                    <tr key={e.idempleado}>
                                                        <td>{e.nombre}</td>
                                                        <td>{e.edad}</td>
                                                        <td>{e.pais}</td>
                                                        <td>{e.cargo}</td>
                                                        <td>S/. {e.sueldo}</td>
                                                        <td>{e.igv.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            }
                                    </tbody>
                                </table>
                                </>
                            ):(
                                existe && (
                                    <p className="fw-bold mt-2">No existe datos de este empleado.</p>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}