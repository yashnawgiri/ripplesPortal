import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import {
  LeftHalfArrowIcon,
  MoneyDebetedIcon,
  MoneyRecievedIcon,
  RightHalfArrowIcon,
} from "@/components/icons";
import UserDefaultLayout from "@/layouts/userDefault";
import {
  fetchTransactions,
  transactionsState,
} from "@/recoil/transactionsState";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";
import { fetchTransactionsService, Transaction } from "@/services/apiService";

interface TransactionCardProps {
  transaction: Transaction;
}

function TransactionCard({ transaction }: TransactionCardProps) {
  const isCredit = transaction.transaction_type === "CREDITED";

  return (
    <div className="w-full mb-4">
      <div className="bg-[#282D45] h-8 pl-4 text-color content-center text-sm font-poppins">
        {new Date(transaction.created_at).toLocaleDateString()}
      </div>
      <div className="flex justify-between bg-primary p-6">
        <div className="flex items-center space-x-6">
          {isCredit ? <MoneyRecievedIcon /> : <MoneyDebetedIcon />}
          <h4 className="heading-color text-xl">
            Reward {isCredit ? "Earned" : "Withdrawn"}
          </h4>
        </div>
        <p
          className={`font-poppins text-2xl font-bold ${
            isCredit ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCredit ? `₹${transaction.amount}` : `-₹${transaction.amount}`}
        </p>
      </div>
    </div>
  );
}

export default function Transactions() {
  const [walletBalance, setWalletBalance] = useRecoilState(walletBalanceState);
  const [transactionGroup, setTransactionGroup] =
    useRecoilState(transactionsState);
  const transactionsLoadable = useRecoilValueLoadable(fetchTransactions);
  const fetchBalance = useRecoilValue(fetchWalletBalance);

  useEffect(() => {
    if (transactionsLoadable.state === "hasValue") {
      setTransactionGroup(transactionsLoadable.contents);
    } else if (transactionsLoadable.state === "hasError") {
      console.error(transactionsLoadable.contents);
    }
  }, [transactionsLoadable, setTransactionGroup]);

  useEffect(() => {
    if (fetchBalance) {
      setWalletBalance(fetchBalance);
    }
  }, [fetchBalance, setWalletBalance]);

  const handlePageChange = async (pageNumber: number) => {
    if (
      transactionGroup &&
      pageNumber <= transactionGroup?.pagination.total_pages &&
      pageNumber > 0
    ) {
      const token = localStorage.getItem("authToken") || "";
      const userId = localStorage.getItem("userId") || "";
      const res = await fetchTransactionsService(token, userId, pageNumber);

      setTransactionGroup(res.data);
    }
  };

  const transactions = transactionGroup?.data || [];
  const pagination = transactionGroup?.pagination || {
    current_page: 1,
    total_pages: 1,
    total_transactions: 0,
  };

  return (
    <UserDefaultLayout>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-2/3 mb-4">
          <div className="bg-primary flex justify-between w-full p-5 rounded-lg items-center border border-gray-800 space-y-1">
            <div>
              <p className="text-gray-400 text-sm">Your Balance</p>
              <p className="text-white text-3xl font-bold">
                ₹{walletBalance ? walletBalance.wallet_balance : 0}
              </p>
            </div>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold font-poppins text-center mt-10 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8">
            Transactions History
          </h1>
          {transactions.map((data: Transaction, index: number) => (
            <TransactionCard key={index} transaction={data} />
          ))}

          {pagination.total_pages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="flex justify-center items-center w-8 h-8 bg-[#282D45] rounded-lg disabled:opacity-50"
                disabled={pagination.current_page === 1}
                onClick={() => handlePageChange(pagination.current_page - 1)}
              >
                <RightHalfArrowIcon />
              </button>
              {[...Array(pagination.total_pages)].map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    className={`flex justify-center items-center w-8 h-8 rounded-lg border border-gray-800 font-poppins text-color ${
                      pageNumber === pagination.current_page
                        ? "bg-[#161251]"
                        : "bg-primary"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className="flex justify-center items-center w-8 h-8 bg-[#282D45] rounded-lg disabled:opacity-50"
                disabled={pagination.current_page === pagination.total_pages}
                onClick={() => handlePageChange(pagination.current_page + 1)}
              >
                <LeftHalfArrowIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </UserDefaultLayout>
  );
}
