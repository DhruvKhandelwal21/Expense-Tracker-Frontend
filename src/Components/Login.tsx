import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
const Login = ({ onClose, openRegister }: any) => {
  const navigate = useNavigate();
  const [initialValues, setValues] = useState({ userName: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const context = useGlobalContext();

  if (!context) {
    return <div>Loading...</div>;
  }
  const { setToken, myUserName } = context;

  const handleSubmit = (values: any) => {
    const data = {
      userName: values.userName,
      password: values.password,
    };

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/user/login`, data)
      .then(({ data: response }) => {
        setSubmitting(false);
        const { data } = response;
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userName", data?.userName);
        setToken(data?.token);
        myUserName(data?.userName);
        navigate("/");
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
  };

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ values, handleChange, submitForm, errors, touched }) => (
          <>
            <div className="bg-white w-[500px] p-6 rounded-xl">
              <div className="flex flex justify-between items-center">
                <h3 className="text-black text-[20px] font-medium">
                  Please Login
                </h3>
                <svg
                  className="cursor-pointer"
                  onClick={onClose}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-8"
              >
                <label className="flex flex-col">
                  <span className="text-black font-medium mb-4">
                    {" "}
                    Your Username
                  </span>
                  <input
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    placeholder="What's your username?"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                  />
                  {errors.userName && touched.userName ? (
                    <div className="text-red-500 font-medium mt-2">
                      {errors.userName}
                    </div>
                  ) : null}
                </label>
                <label className="flex flex-col">
                  <span className="text-black font-medium mb-4">
                    {" "}
                    Your Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="What's your password?"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-500 font-medium mt-2">
                      {errors.password}
                    </div>
                  ) : null}
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                  className="bg-tertiary py-3 px-8 outline-none w-fit text-white foot-hold shadow-primary shadow-md  rounded-xl hover:bg-secondary"
                >
                  Login
                </button>
                <span className="text-black font-medium mt-2">
                  Don't have an account ?{" "}
                  <button
                    className="bg-tertiary py-3 px-8 outline-none w-fit text-white foot-hold shadow-primary shadow-md  rounded-xl hover:bg-secondary"
                    onClick={openRegister}
                  >
                    Register
                  </button>
                </span>
              </form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;
