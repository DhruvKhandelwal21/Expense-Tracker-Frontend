import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import TransactionItem from "../../Components/TransactionItem";
import { useGlobalContext } from "../../context/globalContext";
import sad from "../../assets/sad.avif";
const Income = () => {
  const [addIncomeDialog, setAddIncomeDialog] = useState(false);
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const { incomes, totalIncome, getIncomes, authToken } = context;

  useEffect(() => {
    if (authToken) {
      getIncomes();
    }
  }, [authToken]);

  return (
    <div className="p-4 flex flex-col flex-wrap">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">All Incomes</h1>
          <button
            className="p-2 xs:block lg:hidden bg-gray-300 hover:bg-gray-400 rounded-lg"
            onClick={() => {
              setAddIncomeDialog(!addIncomeDialog);
            }}
          >
            Add Income
          </button>
        </div>

        <div className="px-2 py-5 w-full bg-white rounded-2xl flex justify-center">
          <h1>
            Total Income:{" "}
            <span className="text-green-500">${totalIncome()}</span>{" "}
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <Form type={"Income"} />
        <div className="w-full flex flex-col pt-4 flex-wrap">
          <div className="max-h-[500px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 px-3">
            {incomes.length > 0 ? (
              incomes.map((item, index) => <TransactionItem item={item} />)
            ) : (
              <div className="flex justify-center items-center gap-3">
                <img src={sad} className="w-[50px] h-[50px]" />
                <p className="font-medium">No Income Found...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {addIncomeDialog && (
        <Form
          type={"Income"}
          openForm={addIncomeDialog}
          setForm={setAddIncomeDialog}
          onClose={() => {
            setAddIncomeDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Income;
