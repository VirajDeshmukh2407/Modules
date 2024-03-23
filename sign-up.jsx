import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "./components/OAuth";
import "./sign-in.css";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sign_in = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  // const navigate = useNavigate();

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
      const usercredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = usercredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestap = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("sign up successful");
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Something went wrong with the registration");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center p-3 mt-5 text-dark">Sign Up</h1>
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
                type="text"
                placeholder="Full name"
                id="name"
                value={name}
                onChange={onChange}
                className="mb-4 form-control"
              />
            </div>

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
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-decoration-none text-orange"
                >
                  Login
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
