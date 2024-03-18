import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "./components/OAuth";
import "./sign-in.css";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { signInWithEmailAndPassword, auth, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
const Sign_in = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        toast.success("Sign in successfull");
      }
      // if (!userCredentials.exists()) {
      //   toast.error("Register");
      // }
    } catch (error) {
      toast.error("Sign In failed");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center p-3 mt-5 text-dark">Sign In</h1>
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
            <div className="form-group position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                className="mb-4 form-control"
              />

              {showPassword ? (
                <EyeSlashFill
                  size={16}
                  className="position-absolute top-50 end-0 translate-middle-y"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeFill
                  size={16}
                  className="position-absolute top-50 right-50 end-0 translate-middle-y"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
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

              <Link
                to="/forget-password"
                className="text-md-sm text-decoration-none"
              >
                Forget password?
              </Link>
            </div>
            <button type="submit" className="btn btn-primary btn-block col-12">
              Sign In
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

export default Sign_in;
