import { MoneyDebetedIcon, MoneyRecievedIcon } from "@/components/icons";
import UserDefaultLayout from "@/layouts/userDefault";

type Transaction = {
    transactionType: boolean; // true for credit, false for debit
    amount: number;
};

interface TransactionCardProps {
    date: string;
    transactions: Transaction[];
}

function TransactionCard({ date, transactions }: TransactionCardProps) {
    return (
        <div className="w-full mb-4">
            <div className="bg-[#282D45] h-8 pl-4 text-color content-center text-sm font-poppins">
                {date}
            </div>
            {transactions.map((transaction, index) => {
                const isCredit = transaction.transactionType;
                return (
                    <div key={index} className="flex justify-between bg-primary p-6">
                        <div className="flex items-center space-x-6">
                            {isCredit ? <MoneyRecievedIcon /> : <MoneyDebetedIcon />}
                            <h4 className="heading-color text-xl">
                                Reward {isCredit ? "credited" : "debited"}
                            </h4>
                        </div>
                        <p
                            className={`font-poppins text-2xl font-bold ${isCredit ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            {isCredit ? `₹${transaction.amount}` : `-₹${transaction.amount}`}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

const transactionsData = [
    {
        date: "21 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 320 },
        ],
    },
    {
        date: "12 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 200 },
            { transactionType: false, amount: 150 },
        ],
    },
    {
        date: "09 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 250 },
            { transactionType: false, amount: 120 },
        ],
    },
];

export default function Transactions() {
    return (
        <UserDefaultLayout>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-2/3 mb-4">
                    <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
                        Transctions History
                    </h1>
                    {transactionsData.map((data, index) => (
                        <TransactionCard key={index} date={data.date} transactions={data.transactions} />
                    ))}
                    <button
                        onClick={() => { }}
                        className="bg-gray-800 flex py-1 mx-auto mt-4 heading-color px-6 py-2 font-poppins rounded-full"
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={""}
                        >
                            See More
                        </a>
                    </button>
                </div>
            </div>
        </UserDefaultLayout>
    );
}