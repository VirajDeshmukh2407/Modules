import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "./components/OAuth";
import "./sign-in.css";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth";
// import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const ForgetPass = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error("could not send reset password");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center p-3 mt-5 text-dark">Forget Password</h1>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1709683200&semt=sph"
            alt="sign-in images"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form
            onSubmit={onSubmit}
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
                className="mb-4 form-control"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="text-sm mb-0">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-decoration-none text-orange"
                >
                  Register
                </Link>
              </p>

              <Link to="/" className="text-md-sm text-decoration-none">
                sign in instead
              </Link>
            </div>
            <button type="submit" className="btn btn-primary btn-block col-12">
              Send Password
            </button>

            <div className="d-flex mt-3 justify-content-center align-items-center ">
              <p className="">OR</p>
            </div>

            <div>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
