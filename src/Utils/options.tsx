interface ExpenseOption {
  optionLabel: string;
  optionValue: string;
}
export const incomeOptions: ExpenseOption[] = [
  { optionLabel: "Bitcoin", optionValue: "bitcoin" },
  { optionLabel: "Salary", optionValue: "salary" },
  {
    optionLabel: "Freelancing",
    optionValue: "freelancing",
  },
  {
    optionLabel: "Investments",
    optionValue: "investments",
  },
  {
    optionLabel: "Bank Transfer",
    optionValue: "bankTransfer",
  },
  { optionLabel: "Youtube", optionValue: "youtube" },
  { optionLabel: "Other", optionValue: "other" },
];

export const expenseOptions: ExpenseOption[] = [
  { optionLabel: "Education", optionValue: "education" },
  { optionLabel: "Groceries", optionValue: "groceries" },
  {
    optionLabel: "Health",
    optionValue: "health",
  },
  {
    optionLabel: "Subscription",
    optionValue: "subscription",
  },
  {
    optionLabel: "Takeaway",
    optionValue: "takeaway",
  },
  { optionLabel: "Clothing", optionValue: "clothing" },
  { optionLabel: "Travelling", optionValue: "travelling" },
  { optionLabel: "Other", optionValue: "other" },
];
// import * as React from 'react';
// import { FaBitcoin, FaMoney, FaUser, FaChartLine } from 'react-icons/fa';

// interface ExpenseOption {
//   optionLabel: string;
//   optionValue: string;
//   icon: React.ReactElement;
// }

// export const expenseOptions: ExpenseOption[] = [
//   { optionLabel: "Bitcoin", optionValue: "bitcoin", icon: <FaBitcoin /> },
//   { optionLabel: "Salary", optionValue: "salary", icon: <FaMoney /> },
//   { optionLabel: "Freelancing", optionValue: "freelancing", icon: <FaUser /> },
//   { optionLabel: "Investments", optionValue: "investments", icon: <FaChartLine /> },
//   // Add other options with icons
// ];
// export const bitcoin = <FaBitcoin />;
