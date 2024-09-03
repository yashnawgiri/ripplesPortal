import { useState, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { LeftHalfArrowIcon, MoneyDebetedIcon, MoneyRecievedIcon, RightHalfArrowIcon } from "@/components/icons";
import UserDefaultLayout from "@/layouts/userDefault";
import { Transaction } from "@/services/apiService";
import { fetchTransactions, transactionsState } from "@/recoil/transactionsState";

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
                const isCredit = transaction.type === 'credited';
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

export default function Transactions() {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    const setTransactions = useSetRecoilState(transactionsState);
    const transactionsLoadable = useRecoilValueLoadable<Transaction[]>(fetchTransactions);

    useEffect(() => {
        if (transactionsLoadable.state === "hasValue") {
            setTransactions(transactionsLoadable.contents);
        } else if (transactionsLoadable.state === "hasError") {
            console.error(transactionsLoadable.contents);
        }
    }, [transactionsLoadable, setTransactions]);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

    const transactions: Transaction[] = transactionsLoadable.state === "hasValue" ? transactionsLoadable.contents : [];
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

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
                        <TransactionCard key={index} date={data.date} transactions={[data]} />
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
