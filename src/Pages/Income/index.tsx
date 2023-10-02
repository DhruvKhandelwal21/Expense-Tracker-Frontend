import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import TransactionItem from "../../Components/TransactionItem";
import { useGlobalContext } from "../../context/globalContext";
const Income = () => {
  const [addIncomeDialog, setAddIncomeDialog] = useState(false);
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const { incomes, totalIncome, getIncomes } = context;

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="p-4 flex flex-col flex-wrap">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1>Incomes</h1>
          <button
            className="p-1 xs:block lg:hidden"
            onClick={() => {
              setAddIncomeDialog(!addIncomeDialog);
            }}
          >
            Add Income
          </button>
        </div>

        <div className="px-2 py-5 w-full bg-white rounded-2xl flex justify-center">
          <h1>Total Income: ${totalIncome()}</h1>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <Form type={"Income"} />
        <div className="w-full flex flex-col pt-4 flex-wrap">
          {incomes.map((item, index) => (
            <TransactionItem item={item} />
          ))}
        </div>
      </div>
      {addIncomeDialog && <Form type={"Income"} openForm = {addIncomeDialog} onClose = {()=>{setAddIncomeDialog(false)}} />}
    </div>
  );
};

export default Income;
