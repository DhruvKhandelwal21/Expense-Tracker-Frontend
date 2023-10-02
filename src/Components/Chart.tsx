// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import moment from "moment";
// import { useGlobalContext } from "../context/globalContext";

// const MyCharts = () => {
//   const [expenseData, setExpenseData] = useState<[number, number][]>([]);
//   const [incomeData, setIncomeData] = useState<[number, number][]>([]);
//   const [date, setDate] = useState<string[]>([]);
//   const context = useGlobalContext();

//   if (!context) {
//     return <div>Loading...</div>;
//   }

//   const { expenses, incomes } = context;

//   useEffect(() => {
//     const sortedExpenses = expenses
//       .map((item: any) => ({
//         date: new Date(item.date).getTime(),
//         amount: item.amount,
//       }))
//       .sort((a, b) => b.date - a.date);

//     const sortedIncomes = incomes
//       .map((item: any) => ({
//         date: new Date(item.date).getTime(),
//         amount: item.amount,
//       }))
//       .sort((a, b) => b.date - a.date);

//     // Extract the sorted data for the chart
//     const expenseAmounts = sortedExpenses.map((item) => [
//       item.date,
//       item.amount,
//     ]);
//     const incomeAmounts = sortedIncomes.map((item) => [item.date, item.amount]);

//     setExpenseData(expenseAmounts);
//     setIncomeData(incomeAmounts);
//   }, [expenses, incomes]);
//   console.log(incomeData);

//   const series = [
//     // Data on the y-axis
//     {
//       name: "Expenses",
//       data: expenseData,
//     },
//     {
//       name: "Incomes",
//       data: incomeData,
//     },
//   ];

//   const options = {
//     // Data on the x-axis
//     chart: {
//       id: "line-chart",
//       height: 300,
//       width: 500,
//     },
//     colors: ["#f20d0d", "#08f94c"],
//     xaxis: {
//       type: "datetime",
//     },
//     yaxis: {
//       title: {
//         text: "Amount", // Y-axis title
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-md mt-2">
//       <Chart
//         options={options}
//         series={series}
//         type="line"
//         height={300}
//         width={700}
//       />
//     </div>
//   );
// };

// export default MyCharts;

// src/components/ExpenseIncomeChart.js
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { useGlobalContext } from "../context/globalContext";

// const MyCharts = () => {
//   const [chartData, setChartData] = useState({
//     options: {
//       chart: {
//         id: "expense-income-chart",
//       },
//       xaxis: {
//         type: "datetime",
//         reverse: true,
//       },
//       yaxis: {
//         labels: {
//           formatter: function (value: any) {
//             return value.toFixed(2); // Format Y-axis labels as needed
//           },
//         },
//       },
//     },
//     series: [
//       {
//         name: "Expenses",
//         data: [], // Your expense data here
//       },
//       {
//         name: "Incomes",
//         data: [], // Your income data here
//       },
//     ],
//   });
//   const context = useGlobalContext();

//   if (!context) {
//     return <div>Loading...</div>;
//   }

//   const { expenses, incomes } = context;

//   useEffect(() => {
//     const expensesData = expenses.map((item) => [
//       new Date(item.date).getTime(),
//       item.amount,
//     ]);
//     const incomesData = incomes.map((item) => [
//       new Date(item.date).getTime(),
//       item.amount,
//     ]);

//     console.log(expensesData);
//     console.log(incomesData);

//     // Sort the data by date
//     // expensesData.sort((a, b) => a[0] - b[0]);
//     // incomesData.sort((a, b) => a[0] - b[0]);

//     setChartData({
//       ...chartData,
//       series: [
//         { name: "Expenses", data: expensesData },
//         { name: "Incomes", data: incomesData },
//       ],
//     });
//   }, []);

//   return (
//     <div className="expense-income-chart">
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// export default MyCharts;

import React from "react";
import {
  Chart as ChartJs,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../context/globalContext";
import moment from "moment";
// import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
);

function MyCharts() {
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }
  const { incomes, expenses } = context;
  const incomeData = {
    label: "Income",
    data: incomes.map((income) => ({
      x: moment(income.date).format("DD/MM/YYYY"),
      y: income.amount,
    })),
    backgroundColor: "green",
    tension: 0.3,
  };

  const expenseData = {
    label: "Expenses",
    data: expenses.map((expense) => ({
      x: moment(expense.date).format("DD/MM/YYYY"),
      y: expense.amount,
    })),
    backgroundColor: "red",
    tension: 0.3,
  };

  const data = {
    datasets: [incomeData, expenseData],
  };

  // const options: ChartOptions<"line"> = {
  //   scales: {
  //     // x: {
  //     //   type: "time",
  //     //   time: {
  //     //     unit: "day",
  //     //     tooltipFormat: "DD/MM/YYYY",
  //     //   },
  //     // },
  //     x: {
  //       type: "time",
  //       time: {
  //         unit: "day",
  //         tooltipFormat: "DD/MM/YYYY",
  //         displayFormats: {
  //           day: "dd/mm/yyyy",
  //         },
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <div className=" md:w-[600px] md:h-[300px] xs:w-[350px] sm:w-[500px] sm:h-[300px] mx-auto overflow-hidden">
      <Line data={data} />
    </div>
  );
}

export default MyCharts;
