import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const PirateList = () => {
    const [pirates, setPirates] = useState([]);
    const [sorted, setSorted] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/pirate", { withCredentials: true })
            .then(res => setPirates(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const sorted = [...pirates].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setSorted(sorted);
    }, [pirates]);


    const deletePirate = (id) => {
        Swal.fire({
            title: "Are you sure to delete this?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/pirate/${id}`, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                        setPirates(pirates.filter((pirate) => pirate._id !== id));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }})
    
    }
  


   return (
    <div className="container mt-5">
        <h1>Pirate Crew</h1>
        <div className="d-flex justify-content-end">
            <Link to="/pirate/new" className="btn btn-primary">
                Add Pirate
            </Link>
        </div>
        {
            sorted.map((pirate, i) => (
                <div className="p-4 border mt-3 " key={i}>
                    <h3>{pirate.name}</h3>
                    <img src={pirate.image} alt="pirate" />
                    <div className="d-flex justify-content-center" >
                        <Link to={`/pirate/edit/${pirate._id}`} className="btn btn-primary" style={{ marginRight: "10px" }}>View Pirate</Link>
                        <Link className="btn btn-danger" onClick={() => deletePirate(pirate._id)}> Walk the plank</Link>
                    </div>
                </div>
            ))
        }
    </div>
)
}

export default PirateList



            
    
    