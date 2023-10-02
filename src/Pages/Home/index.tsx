import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import MyCharts from "../../Components/Chart";
import History from "../../Components/History";

const Home = () => {
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
    transactionHistory,
  } = context;

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);

  console.log(transactionHistory());

  return (
    <div className="flex p-4 flex-col">
      <h1 className="font-semibold">ALL TRANSACTIONS</h1>
      <div className="flex flex-col justify-center lg:flex-row lg:gap-10 xs:gap-5 max-w-screen-xl ">
        {/* Left Section */}
        <div className="flex flex-col lg:flex-wrap gap-5">
          <MyCharts />

          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col gap-1 bg-white p-4  rounded-2xl">
              <span>Total Income</span>
              <p className="text-green-400">${totalIncome()}</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
              <span>Total Expense</span>
              <p className="text-red-400">${totalExpenses()}</p>
            </div>
            <div className="lg:hidden flex flex-col gap-1 p-4 bg-white rounded-2xl">
              <span>Total Balance</span>
              <p>${totalBalance()}</p>
            </div>
          </div>

          <div className=" hidden lg:flex flex-col items-center justify-center mt-3 gap-1 py-4 bg-white rounded-2xl">
            <span>Total Balance</span>
            <p>${totalBalance()}</p>
          </div>
        </div>

        {/* Right Section (History) */}
        <div className="w-full flex lg:flex-col gap-5">
          <History />
          <div className="hidden sm:flex flex-col justify-center w-full gap-5 ">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h3>Min</h3>
                <span className="font-bold">Salary</span>
                <h3>Max</h3>
              </div>
              <div className="flex justify-between bg-white rounded-2xl p-3">
                <p>${Math.min(...incomes.map((item) => item.amount))}</p>
                <p>${Math.max(...incomes.map((item) => item.amount))}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h3>Min</h3>
                <span className="font-bold">Expenses</span>
                <h3>Max</h3>
              </div>
              <div className="flex  justify-between bg-white rounded-2xl p-3">
                <p>${Math.min(...expenses.map((item) => item.amount))}</p>
                <p>${Math.max(...expenses.map((item) => item.amount))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
