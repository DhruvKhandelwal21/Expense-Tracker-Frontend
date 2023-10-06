import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { expenseOptions, incomeOptions } from "../Utils/options";
import { useGlobalContext } from "../context/globalContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
const Form = ({ type, openForm, onClose, setForm }: any) => {
  const [initialValues, setValues] = useState({
    title: "",
    category: "",
    description: "",
    amount: "",
    date: new Date(),
  });
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Set the initial value of the `isMobile` state variable
    setIsPc(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: any) => {
      setIsPc(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  console.log(isPc);
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }
  //   const { transactionHistory } = context;
  //   const [...history] = transactionHistory();
  //   console.log(history);
  const { addExpense, addIncome } = context;

  const handleSubmit = (values: any, actions: any) => {
    values.type = type;
    type === "Expense" ? addExpense(values) : addIncome(values);
    actions.resetForm();
    onClose();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    amount: Yup.number()
      .required("Amount is required")
      .moreThan(0, "Amount must be greater than 0"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div
      className={
        !isPc && openForm
          ? `fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm `
          : `flex flex-wrap xs:hidden lg:block`
      }
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          submitForm,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <div
              className={`  ${
                isPc
                  ? "w-[300px] rounded-xl"
                  : "bg-white sm:w-4/5 flex flex-col flex-wrap sm:p-4 xs:p-8 rounded-xl"
              }`}
            >
              {!isPc && (
                <div className="flex justify-between items-center">
                  <h3 className="text-black text-[20px] font-medium">
                    {`Add the ${type}`}
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
              )}
              <form
                // onSubmit={handleSubmit}
                className="mt-5 flex flex-col flex-wrap gap-8"
              >
                <label className="flex flex-col">
                  {errors.title && touched.title ? (
                    <p className="text-red-500 -mt-3 mb-1 font-small">
                      *{errors.title}
                    </p>
                  ) : null}
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Enter the title?"
                    className={`bg-white py-2 px-4 placeholder:text-secondary text-black rounded-lg ${
                      errors.title && touched.title
                        ? "border-red-500"
                        : "border-black"
                    } border-2 font-medium`}
                  />
                </label>
                <label className="flex flex-col">
                  {errors.amount && touched.amount ? (
                    <p className="text-red-500 -mt-5 mb-1 font-small">
                      *{errors.amount}
                    </p>
                  ) : null}
                  <input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className={`bg-white py-2 px-4 placeholder:text-secondary text-black rounded-lg ${
                      errors.amount && touched.amount
                        ? "border-red-500"
                        : "border-black"
                    } border-2 font-medium`}
                  />
                </label>
                <label className="flex flex-col">
                  <ErrorMessage name="date">
                    {(errorMsg: string) => (
                      <p className="text-red-500 -mt-5 mb-1 font-small">
                        *{errorMsg}
                      </p>
                    )}
                  </ErrorMessage>
                  <DatePicker
                    className={`bg-white py-2 px-4 placeholder:text-secondary text-black rounded-lg ${
                      errors.date && touched.date
                        ? "border-red-500"
                        : "border-black"
                    } border-2 font-medium`}
                    id="date"
                    placeholderText="Enter A Date"
                    selected={values.date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: any) => {
                      setFieldValue("date", date);
                    }}
                  />

                  {/* {errors.date && touched.date ? (
                    <div className="text-red-500 font-medium mt-2">
                      
                    </div>
                  ) : null} */}
                </label>
                <label className="flex flex-col">
                  {errors.category && touched.category ? (
                    <p className="text-red-500 -mt-5 mb-1 font-small">
                      *{errors.category}
                    </p>
                  ) : null}
                  <select
                    name="category"
                    className={`bg-white py-2 px-4 placeholder:text-secondary text-black rounded-lg ${
                      errors.category && touched.category
                        ? "border-red-500"
                        : "border-black"
                    } border-2 font-medium`}
                    value={values.category}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    {(type === "Expense" ? expenseOptions : incomeOptions).map(
                      (item, index) => (
                        <option key={index} value={item.optionValue}>
                          {item.optionLabel}
                        </option>
                      )
                    )}
                  </select>
                </label>
                <label className="flex flex-col">
                  {errors.description && touched.description ? (
                    <p className="text-red-500 -mt-5 mb-1 font-small">
                      *{errors.description}
                    </p>
                  ) : null}
                  <textarea
                    rows={3}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className={`bg-white py-2 px-4 placeholder:text-secondary text-black rounded-lg ${
                      errors.description && touched.description
                        ? "border-red-500"
                        : "border-black"
                    } border-2 font-medium`}
                  />
                </label>
                <button
                  type="submit"
                  //   disabled={submitting}
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                  className="bg-tertiary py-3 px-8 outline-none w-fit text-white foot-hold shadow-primary shadow-md  rounded-xl hover:bg-secondary flex flex-row items-center"
                >
                  <AiOutlinePlusCircle className="mx-1" /> Add {type}
                </button>
              </form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Form;
