import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import TransactionItem from "../../Components/TransactionItem";
import { useGlobalContext } from "../../context/globalContext";
import happy from "../../assets/happy.png";
const Income = () => {
  const [addExpenseDialog, setAddExpenseDialog] = useState(false);
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const { expenses, totalExpenses, getExpenses, authToken } = context;

  useEffect(() => {
    if (authToken) getExpenses();
  }, [authToken]);

  return (
    <div className="p-4 flex flex-col flex-wrap">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">All Expenses</h1>
          <button
            className="p-2 xs:block lg:hidden bg-gray-300 hover:bg-gray-400 rounded-lg"
            onClick={() => {
              setAddExpenseDialog(!addExpenseDialog);
            }}
          >
            Add Expense
          </button>
        </div>

        <div className="px-2 py-5 w-full bg-white rounded-2xl flex justify-center">
          <h1>
            Total Expense:{" "}
            <span className="text-red-500">${totalExpenses()}</span>{" "}
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <Form type={"Expense"} />
        <div className="w-full flex flex-col pt-4 flex-wrap">
          <div className="max-h-[500px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 px-3">
            {expenses.length > 0 ? (
              expenses.map((item, index) => <TransactionItem item={item} />)
            ) : (
              <div className="flex justify-center items-center gap-3">
                <img src={happy} className="w-[50px] h-[50px] p-0" />
                <p className="font-medium">No Expense Found...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {addExpenseDialog && (
        <Form
          type={"Expense"}
          openForm={addExpenseDialog}
          setForm={setAddExpenseDialog}
          onClose={() => {
            setAddExpenseDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Income;
