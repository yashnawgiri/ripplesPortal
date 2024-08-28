import { useState } from "react";
import { LeftHalfArrowIcon, MoneyDebetedIcon, MoneyRecievedIcon, RightHalfArrowIcon } from "@/components/icons";
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
                                Reward {isCredit ? "Earned" : "Withdrawn"}
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

// Dummy Transactions (Will remove after API integration)
const transactionsData = [
    {
        date: "21 JUL, 2024",
        transactions: [{ transactionType: true, amount: 320 }],
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
    {
        date: "08 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 400 },
            { transactionType: false, amount: 100 },
        ],
    },
    {
        date: "07 JUL, 2024",
        transactions: [
            { transactionType: false, amount: 80 },
            { transactionType: true, amount: 600 },
        ],
    },
    {
        date: "06 JUL, 2024",
        transactions: [
            { transactionType: false, amount: 50 },
            { transactionType: true, amount: 500 },
        ],
    },
    {
        date: "05 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 300 },
            { transactionType: false, amount: 200 },
        ],
    },
    {
        date: "04 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 700 },
            { transactionType: false, amount: 400 },
        ],
    },
    {
        date: "03 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 100 },
            { transactionType: false, amount: 50 },
        ],
    },
    {
        date: "02 JUL, 2024",
        transactions: [
            { transactionType: true, amount: 800 },
            { transactionType: false, amount: 250 },
        ],
    },
    {
        date: "01 JUL, 2024",
        transactions: [
            { transactionType: false, amount: 150 },
            { transactionType: true, amount: 450 },
        ],
    },
    {
        date: "30 JUN, 2024",
        transactions: [
            { transactionType: true, amount: 650 },
            { transactionType: false, amount: 300 },
        ],
    },
    {
        date: "29 JUN, 2024",
        transactions: [
            { transactionType: false, amount: 350 },
            { transactionType: true, amount: 900 },
        ],
    },
];

export default function Transactions() {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 3;

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactionsData.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transactionsData.length / transactionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <UserDefaultLayout>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-2/3 mb-4">
                    <div className="bg-primary flex justify-between w-full p-5 rounded-lg items-center border border-gray-800 space-y-1">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Your Balance
                            </p>
                            <p className="text-white text-3xl font-bold">
                                ₹{"220.00"}
                            </p>
                        </div>
                    </div>
                    <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
                        Transactions History
                    </h1>
                    {currentTransactions.map((data, index) => (
                        <TransactionCard key={index} date={data.date} transactions={data.transactions} />
                    ))}

                    <div className="flex justify-center mt-4 space-x-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="flex justify-center items-center w-8 h-8 bg-[#282D45] rounded-lg disabled:opacity-50"
                        >
                            <RightHalfArrowIcon />
                        </button>
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageClick(pageNumber)}
                                    className={`flex justify-center items-center w-8 h-8 rounded-lg border border-gray-800 font-poppins text-color ${pageNumber === currentPage ? "bg-[#161251]" : "bg-primary "
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="flex justify-center items-center w-8 h-8 bg-[#282D45] rounded-lg disabled:opacity-50"
                        >
                            <LeftHalfArrowIcon />
                        </button>
                    </div>
                </div>
            </div>
        </UserDefaultLayout>
    );
}
