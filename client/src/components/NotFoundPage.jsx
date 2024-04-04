import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist, do you want to create it?</p>
      <Link className="btn btn-primary" to="/new">Go back to create authors</Link>
     

    </div>
  );
};

export default NotFoundPage;

