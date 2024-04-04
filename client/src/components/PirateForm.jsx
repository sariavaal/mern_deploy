import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const initialValues = {
  name: "",
  imageUrl: "",
  treasureChests: "",
  catchPhrase: "",
  pegLeg: true,
  eyePatch: true,
  hookHand: true,
  crewPosition: "",
};


const onSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    await axios.post("http://localhost:8000/api/pirate", values,  { withCredentials: true } );
    resetForm();
    Swal.fire({
      title: "Exito",
      text: "Pirata creado correctamente",
      icon: "success"
    })
  } catch (err) {
    console.log("Error: ", err.response.data);
  }
  setSubmitting(false);
}


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Pirate name is required")
    .min(3, "Pirate name must be at least 3 characters"),
  imageUrl: Yup.string()
    .required("Pirate image is required")
    .min(3, "Pirate image must be at least 3 characters"),
  treasureChests: Yup.number().required("Pirate treasure chests is required"),
  catchPhrase: Yup.string()
    .required("Pirate catch phrase is required")
    .min(3, "Pirate catch phrase must be at least 3 characters"),
  pegLeg: Yup.boolean(),
  eyePatch: Yup.boolean(),
  hookHand: Yup.boolean(),
  crewPosition: Yup.string()
    .required("Pirate crew position is required")
    .min(3, "Pirate crew position must be at least 3 characters"),
});
const PirateForm = () => {
  return (
    <Formik
  initialValues={{ pegLeg: false, eyePatch: false, hookHand: false, ...initialValues }}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
  enableReinitialize
>

      <Form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" className="form-control" />
          <ErrorMessage
            name="name"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url</label>
          <Field
            type="text"
            name="imageUrl"
            id="imageUrl"
            className="form-control"
          />
          <ErrorMessage
            name="imageUrl"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="treasureChests">Treasure Chests</label>
          <Field
            type="number"
            name="treasureChests"
            id="treasureChests"
            className="form-control"
          />
          <ErrorMessage
            name="treasureChests"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="catchPhrase">Catch Phrase</label>
          <Field
            type="text"
            name="catchPhrase"
            id="catchPhrase"
            className="form-control"
          />
          <ErrorMessage
            name="catchPhrase"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="crewPosition">Crew Position</label>
          <Field
            as="select"
            name="crewPosition"
            id="crewPosition"
            className="form-control"
          >
            {['captain', 'firstMate', 'quarterMaster', 'boatswain', 'powderMonkey'].map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="crewPosition"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pegLeg">Peg Leg</label>
          <Field
            type="checkbox"
            name="pegLeg"
            id="pegLeg"
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="eyePatch">Eye Patch</label>
          <Field
            type="checkbox"
            name="eyePatch"
            id="eyePatch"
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="hookHand">Hook Hand</label>
          <Field
            type="checkbox"
            name="hookHand"
            id="hookHand"
            
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

PirateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    catchPhrase: PropTypes.string,
    pegLeg: PropTypes.bool,
    eyePatch: PropTypes.bool,
    hookHand: PropTypes.bool,
    crewPosition: PropTypes.string,
  }),
};

export default PirateForm;
