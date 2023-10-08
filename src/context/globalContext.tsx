// import React, { useContext, useState } from "react";
// const globalContext = React.createContext(null);

// export const GlobalProvider = ({children})=>{

// }
// interface MyContextType {
//   getIncomes: () => any; // Replace 'any' with the actual return type of getIncomes
// }
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Income {
  id: number;
  title: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

interface Expense {
  id: number;
  title: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

interface GlobalContextType {
  incomes: Income[];
  expenses: Expense[];
  addIncome: (income: number) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: any) => Promise<void>;
  totalIncome: () => number;
  addExpense: (expense: number) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: any) => Promise<void>;
  totalExpenses: () => number;
  totalBalance: () => number;
  transactionHistory: () => (Income | Expense)[];
  setToken: (token: any) => void;
  authToken: any;
  submitting: boolean;
  userName: string;
  myUserName: (userName: any) => void;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: any) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const setToken = (token: any) => {
    setAuthToken(token);
  };

  const myUserName = (userName: any) => {
    setUserName(userName);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const newUserName = localStorage.getItem("userName");
    if (storedToken) {
      setAuthToken(storedToken);
    }
    if (newUserName) {
      setUserName(newUserName);
    }
  }, []);

  const addIncome = async (income: any) => {
    const response = await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/income/create`, income, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/income/find`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const { incomes } = response?.data;
    setIncomes(incomes);
  };

  const deleteIncome = async (id: any) => {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/income/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income: any) => {
      totalIncome = totalIncome + parseFloat(income.amount);
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income: Number) => {
    const response = await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/expense/create`, income, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    // await waitForToken();
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/expense/find`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const { expenses } = response?.data;
    setExpenses(expenses);
  };

  const deleteExpense = async (id: any) => {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/expense/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income: any) => {
      totalIncome = totalIncome + parseFloat(income.amount);
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = (): (Income | Expense)[] => {
    const history = [...(incomes as Income[]), ...(expenses as Expense[])];
    history.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        setToken,
        authToken,
        submitting,
        userName,
        myUserName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
