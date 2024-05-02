import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";
// import { db } from "react-icons/di";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
// import Sign_in from "./sign-in";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onLogOut() {
    auth.signOut();
    navigate("/sign_in");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("Profile Details Updated");
      }
    } catch (error) {
      toast.error("Could not Update the details");
    }
  }
  return (
    <>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h1 className="text-center p-3 mt-5 mb-4 text-dark text-md">
          My Profile
        </h1>

        <div className="form-group col-md-8 col-sm-6 d-flex justify-content-center">
          <input
            type="text"
            placeholder="Full name"
            id="name"
            value={name}
            // onChange={onChange}
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-4 form-control ${changeDetail && "bg-danger"}`}
          />
        </div>

        <div className="form-group col-md-8 col-sm-6 d-flex justify-content-center">
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            // onChange={onChange}
            className="mb-4 form-control"
            disabled
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mr-2 col-md-8 col-sm-5">
          <p className="text-sm mb-0 mr-4 ">
            Do want to change your name?{""}
            <Link
              className="text-decoration-none text-orange"
              onClick={() => {
                changeDetail && onsubmit();
                setChangeDetail((prevState) => !prevState);
              }}
            >
              {changeDetail ? "Apply Change" : "Edit"}
            </Link>
          </p>
          <Link
            to="/sign_in"
            className="text-md-sm text-decoration-none"
            onClick={onLogOut}
          >
            sign out
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
