import React, { useEffect } from "react";
import Form from "../../Components/Form";
import TransactionItem from "../../Components/TransactionItem";
import { useGlobalContext } from "../../context/globalContext";
const Expense = () => {
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const { expenses, totalExpenses, getExpenses } = context;

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="p-4 flex flex-col">
      <div className="flex flex-col gap-3">
        <h1>Expenses</h1>
        <div className="px-2 py-5 w-full bg-white rounded-2xl flex justify-center">
          <h1>Total Expense: ${totalExpenses()}</h1>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <Form type={"Expense"} />
        <div className="w-full flex flex-col pt-4 flex-wrap">
          {expenses.map((item, index) => (
            <TransactionItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expense;
