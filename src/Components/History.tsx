import React from "react";
import { useGlobalContext } from "../context/globalContext";

const History = () => {
  const context = useGlobalContext();

  if (!context) {
    return <div>Loading...</div>;
  }
  const { transactionHistory } = context;

  const [...history] = transactionHistory();

  return (
    <div className="w-full">
      <h2 className="mb-3 font-semibold">Recent History</h2>
      {history.map((item: any) => {
        const { _id, title, amount, type } = item;
        return (
          <div
            key={_id}
            className="bg-white rounded-2xl flex flex-row justify-between items-center p-3 mb-3"
          >
            <p
              style={{
                color: type === "Expense" ? "red" : "green",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === "Expense" ? "red" : "green",
              }}
            >
              {type === "expense" ? `-${amount}` : `+${amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default History;
