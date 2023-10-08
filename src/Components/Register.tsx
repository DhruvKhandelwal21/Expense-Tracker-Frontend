import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
const Register = ({ onClose }: any) => {
  const navigate = useNavigate();
  const [initialValues, setValues] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const context = useGlobalContext();

  if (!context) {
    return <div>Loading...</div>;
  }
  const { setToken,myUserName } = context;
  const handleSubmit = (values: any) => {
    setSubmitting(true);
    const data = {
      email: values.email,
      userName: values.userName,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/user/register`, data)
      .then((response) => {
        setSubmitting(false);
        const { data } = response;
        localStorage.setItem("token", data?.newUser?.token);
        setToken(data?.newUser?.token);
        myUserName(data?.newUser?.userName);
        navigate("/");
      })
      .catch((err) => {
        setSubmitting(false);
      });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    userName: Yup.string().required("Username is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Your password is too short."),
    confirmPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
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
            <div className="bg-white w-[600px] h-[400px] p-6 rounded-xl mt-10 flex flex-col justify-center ">
              <div className="flex justify-between items-center">
                <h3 className="text-black text-[20px] font-medium">
                  Please Register
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
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="mt-3 flex flex-wrap gap-8 items-center "
                >
                  <label className="flex flex-col">
                    <span className="text-black font-medium mb-2">
                      {" "}
                      Your Email
                    </span>
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-500 font-medium mt-1">
                        {errors.email}
                      </p>
                    ) : null}
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black font-medium mb-2">
                      {" "}
                      Your Username
                    </span>
                    <Field
                      type="text"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                    />
                    {errors.userName && touched.userName ? (
                      <div className="text-red-500 font-medium mt-1">
                        {errors.userName}
                      </div>
                    ) : null}
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black font-medium mb-2">
                      {" "}
                      Your Password
                    </span>
                    <Field
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 font-medium mt-1">
                        {errors.password}
                      </div>
                    ) : null}
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black font-medium mb-2">
                      {" "}
                      Confirm Password
                    </span>
                    <Field
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confrim your password?"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-node font-medium"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="text-red-500 font-medium mt-1">
                        {errors.confirmPassword}
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
                    Register
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
