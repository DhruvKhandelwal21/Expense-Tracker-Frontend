import React, { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { expenseOptions, incomeOptions } from "../Utils/options";
import { useGlobalContext } from "../context/globalContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
const Form = ({ type, openForm, onClose }: any) => {
  const [initialValues, setValues] = useState({
    title: "",
    category: "",
    description: "",
    amount: "",
    date: new Date(),
  });
  console.log(openForm);
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
    <div className={`flex flex-wrap xs:hidden lg:block`}>
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
            <div className=" w-[300px] rounded-xl">
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
