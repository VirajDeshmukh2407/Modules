import ForgetPass from "./page/components/forget-password";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_in from "./page/sign-in";
import Sign_up from "./page/sign-up";
import OAuth from "./page/components/OAuth";
import { ToastContainer } from "react-toastify";
import Profile from "./page/profile";
import "./page/sign-in.css";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./page/components/privateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="sign_in" element={<Sign_in />} />
          <Route path="sign_up" element={<Sign_up />} />
          <Route path="forget_password" element={<ForgetPass />} />
          {/* <Route path="Profile" element={<PrivateRoute />}>
            <Route path="Profile" element={<Profile />} />
          </Route> */}
          {/* <Route path="Profile" element={<PrivateRoute />} /> */}

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="OAuth" element={<OAuth />} />
          <Route path="OAuth" element={<OAuth />} />
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
};

export default App;
