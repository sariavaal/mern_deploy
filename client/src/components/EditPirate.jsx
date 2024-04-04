import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPirate = () => {
    const [pirate, setPirate] = useState({});
    const [formValues, setFormValues] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pirate/${id}`, { withCredentials: true })
            .then((res) => setPirate(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/pirate/${id}`, formValues, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1 className="text-center">Deep Sea Davy</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src="{pirate.image}" className="img-fluid" alt="pirate" />
                    </div>
                    <div className="col-md-8">
                        <h3>About</h3>
                        <p><strong>Position:</strong> {pirate.position}</p>
                        <p><strong>Catch Phrase:</strong> {pirate.catchPhrase}</p>
                        <p><strong>Crew Position:</strong> {pirate.crewPosition}</p>
                        <p><strong>Eye Patch:</strong> {pirate.eyePatch}</p>
                        <p><strong>Peg Leg:</strong> {pirate.pegLeg}</p>
                        <p><strong>Hook Hand:</strong> {pirate.hookHand}</p>
                        <p><strong>Treasure Chests:</strong> {pirate.treasureChests}</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-3">
                <Link to="/pirates" className="btn btn-primary">
                    Back to crew board
                </Link>
            </div>

        </div>
    );
};
export default EditPirate;