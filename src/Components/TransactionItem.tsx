import icons from "../Utils/Icons";
import moment from "moment";
import { useGlobalContext } from "../context/globalContext";
const TransactionItem = ({ item }: any) => {
  const {
    Bitcoin,
    DollarSign,
    PiggyBank,
    SolidBank,
    MasterCard,
    Youtube,
    Freelance,
    Globe,
    Comments,
    Calendar,
    Takeaway,
    Book,
    Food,
    Trash,
    Tv,
    User,
    Stocks,
    Medical,
    Circle,
    Clothes,
  } = icons;
  const categoryIcon = () => {
    switch (item.category) {
      case "salary":
        return <MasterCard className="w-[35px] h-[35px]" />;
      case "freelancing":
        return <Freelance className="w-[35px] h-[35px]" />;
      case "investments":
        return <Stocks className="w-[35px] h-[35px]" />;
      case "stocks":
        return <User className="w-[35px] h-[35px]" />;
      case "bitcoin":
        return <Bitcoin className="w-[35px] h-[35px]" />;
      case "bank":
        return <SolidBank className="w-[35px] h-[35px]" />;
      case "youtube":
        return <Youtube className="w-[35px] h-[35px]" />;
      case "other":
        return <PiggyBank className="w-[35px] h-[35px]" />;
      default:
        return null;
    }
  };
  const context = useGlobalContext();
  if (!context) {
    // Handle the case where context is undefined (optional)
    return <div>Loading...</div>;
  }

  const { deleteIncome, deleteExpense } = context;
  const expenseCatIcon = () => {
    switch (item.category) {
      case "education":
        return <Book className="w-[35px] h-[35px]" />;
      case "groceries":
        return <Food className="w-[35px] h-[35px]" />;
      case "health":
        return <Medical className="w-[35px] h-[35px]" />;
      case "subscription":
        return <Tv className="w-[35px] h-[35px]" />;
      case "takeaway":
        return <Takeaway className="w-[35px] h-[35px]" />;
      case "clothing":
        return <Clothes className="w-[35px] h-[35px]" />;
      case "travelling":
        return <Freelance className="w-[35px] h-[35px]" />;
      case "other":
        return <Circle className="w-[35px] h-[35px]" />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full px-4 py-2 mb-4 flex flex-row justify-between items-center bg-white rounded-3xl">
      <div className="flex flex-row gap-8 items-center">
        <div className="xs:hidden sm:block">
          {item.type === "Income" ? categoryIcon() : expenseCatIcon()}
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <p className="">{item.title}</p>
          <div className="flex gap-5">
            <div className={`flex flex-row gap-1 items-center`}>
              <DollarSign
              // style={{ color: item?.type === "Expense" ? "Red" : "Green" }}
              />{" "}
              {item.amount}
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Calendar /> {moment(item.date).format("DD/MM/YYYY")}
            </div>
            <div className="xs:hidden sm:flex flex-row gap-1 items-center">
              <Comments /> {item.description}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Trash
          size={25}
          style={{ color: "red" }}
          className="cursor-pointer hover:bg-red-100 p-1 rounded-xl"
          onClick={() => {
            item?.type === "Expense"
              ? deleteExpense(item?._id)
              : deleteIncome(item?._id);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionItem;
