import axios from "axios";
import PirateForm from "./PirateForm";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const CreatePirate = () => {
    const onSubmit = async (values , { resetForm }) => {
        try {
            const dataSend = {
                ...values
            }
            const response = await axios.post(
                "http://localhost:8000/api/pirate",
                dataSend
            );
            if (response.status === 200) {
                //alert("Pirate created successfully");
                Swal.fire({
                    title: "Exito",
                    text: "Pirata creado correctamente",
                    icon: "success"
                })
                resetForm();
            } else {
                console.log("Failed to create pirate");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container">
            <h1>Add Pirate</h1>
            <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" to="/pirates"> crew board</Link>
            </div>
            <PirateForm onSubmit={onSubmit} />
        </div>
    );

    }

export default CreatePirate

       

            

