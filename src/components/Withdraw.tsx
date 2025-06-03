import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Progress } from "@/components/ui/Progress";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";

import UserDefaultLayout from "@/layouts/userDefault";
import {
  accountDetails,
  WithdrawRequestDetails,
  withdrawRequestService,
} from "@/services/apiService";
import {
  fetchWalletBalance,
  walletBalanceState,
} from "@/recoil/walletBalanceState";

interface FormErrors {
  amount: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  phone: string;
  accountHolderName: string;
  withdrawalMethod: string;
}

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Withdraw: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<string>("");
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [ifscCode, setIfscCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [accountHolderName, setAccountHolderName] = useState<string>("");

  const fetchBalance = useRecoilValue(fetchWalletBalance);
  const [walletBalance, setWalletBalance] = useRecoilState(walletBalanceState);

  const [errors, setErrors] = useState<FormErrors>({
    amount: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    phone: "",
    accountHolderName: "",
    withdrawalMethod: "",
  });

  const validateAmount = (value: string): string => {
    if (!value) return "Amount is required";
    if (isNaN(Number(value))) return "Amount must be a number";
    if (Number(value) <= 0) return "Amount must be greater than 0";
    if (walletBalance && Number(value) > walletBalance?.wallet_balance)
      return "Insufficient balance";

    return "";
  };

  const validateWithdrawalMethod = (value: string): string => {
    if (!value) return "Please select a withdrawal method";

    return "";
  };

  const validateAccountNumber = (value: string): string => {
    if (!value) return "Account number is required";
    if (!/^\d{9,18}$/.test(value)) return "Invalid account number format";

    return "";
  };

  const validateIFSC = (value: string): string => {
    if (!value) return "IFSC code is required";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value))
      return "Invalid IFSC code format";

    return "";
  };

  const validatePhone = (value: string): string => {
    if (!value) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(value)) return "Invalid Indian phone number";

    return "";
  };

  const validateBankName = (value: string): string => {
    if (!value) return "Bank name is required";
    if (value.length < 3) return "Bank name is too short";

    return "";
  };

  const validateAccountHolderName = (value: string): string => {
    if (!value) return "Account holder name is required";
    if (value.length < 3) return "Name is too short";

    return "";
  };

  const handleNext = (): void => {
    if (step === 1) {
      const amountError = validateAmount(amount);

      if (amountError) {
        setErrors((prev) => ({ ...prev, amount: amountError }));

        return;
      }
    }
    if (step === 2) {
      const methodError = validateWithdrawalMethod(withdrawalMethod);

      if (methodError) {
        setErrors((prev) => ({ ...prev, withdrawalMethod: methodError }));

        return;
      }
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = (): void => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const newErrors = {
        accountNumber: validateAccountNumber(accountNumber),
        bankName: validateBankName(bankName),
        ifscCode: validateIFSC(ifscCode),
        phone: validatePhone(phone),
        accountHolderName: validateAccountHolderName(accountHolderName),
        amount: validateAmount(amount),
        withdrawalMethod: validateWithdrawalMethod(withdrawalMethod),
      };

      if (Object.values(newErrors).some((error) => error !== "")) {
        setErrors(newErrors);

        return;
      }

      const bankDetails: accountDetails = {
        account_number: accountNumber,
        ifsc_code: ifscCode,
        account_holder_name: accountHolderName,
        contact_number: phone,
        bank_name: bankName,
      };

      const withdrawalData: WithdrawRequestDetails = {
        amount: Number(amount),
        bankAccountDetails: bankDetails,
      };

      const userId = localStorage.getItem("userId") || "";
      const authToken = localStorage.getItem("authToken") || "";

      const response = await withdrawRequestService(
        userId,
        authToken,
        withdrawalData,
      );

      toast.success(response.message);
      setStep(4);
    } catch (error) {
      if (error instanceof Error)
        toast.error("Insufficient balance in your account.");
      else toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (fetchBalance) {
      setWalletBalance(fetchBalance);
    }
  }, [fetchBalance, setWalletBalance]);

  return (
    <UserDefaultLayout>
      <div className="min-h-screen bg-primary p-4">
        <Card className="max-w-lg mx-auto bg-primary shadow-lg">
          <CardHeader className="flex flex-col gap-3 border-b border-white/10">
            <h3 className="text-2xl font-bold text-center text-zinc-100">
              Withdraw Funds
            </h3>
            <Progress
              className="max-w-md"
              value={(step / 3) * 100}
            />
          </CardHeader>
          <CardBody className="gap-4">
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Amount</Label>
                  <Input
                    className="text-white"
                    error={!!errors.amount}
                    placeholder="Enter amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        amount: validateAmount(e.target.value),
                      }));
                    }}
                  />
                  {errors.amount && (
                    <span className="text-danger text-xs mt-1">{errors.amount}</span>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div
                aria-label="Select withdrawal method"
                className="flex flex-col gap-4"
                role="region"
              >
                <div className="flex flex-col gap-2">
                  <Label>Select withdrawal method</Label>
                  <Select
                    options={[{ value: "bank", label: "Bank Transfer" }]}
                    placeholder="Select a method"
                    value={withdrawalMethod}
                    onChange={(e) => {
                      setWithdrawalMethod(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        withdrawalMethod: validateWithdrawalMethod(
                          e.target.value,
                        ),
                      }));
                    }}
                  />
                  {errors.withdrawalMethod && (
                    <span className="text-danger text-xs mt-1">{errors.withdrawalMethod}</span>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                aria-label="Bank account details form"
                className="flex flex-col gap-4"
                role="form"
                onSubmit={handleSubmit}
              >
                {[
                  {
                    label: "Account Holder Name",
                    value: accountHolderName,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setAccountHolderName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        accountHolderName: validateAccountHolderName(
                          e.target.value,
                        ),
                      }));
                    },
                    error: errors.accountHolderName,
                    placeholder: "Enter account holder name",
                    ariaLabel: "Account holder name input",
                  },
                  {
                    label: "Bank Name",
                    value: bankName,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setBankName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        bankName: validateBankName(e.target.value),
                      }));
                    },
                    error: errors.bankName,
                    placeholder: "Enter bank name",
                    ariaLabel: "Bank name input",
                  },
                  {
                    label: "Account Number",
                    value: accountNumber,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setAccountNumber(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        accountNumber: validateAccountNumber(e.target.value),
                      }));
                    },
                    error: errors.accountNumber,
                    placeholder: "Enter account number",
                    ariaLabel: "Account number input",
                  },
                  {
                    label: "IFSC Code",
                    value: ifscCode,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setIfscCode(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        ifscCode: validateIFSC(e.target.value),
                      }));
                    },
                    error: errors.ifscCode,
                    placeholder: "Enter IFSC code",
                    ariaLabel: "IFSC code input",
                  },
                  {
                    label: "Phone Number",
                    value: phone,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        phone: validatePhone(e.target.value),
                      }));
                    },
                    error: errors.phone,
                    placeholder: "Enter phone number",
                    ariaLabel: "Phone number input",
                  },
                ].map((field, index) => (
                  <div className="flex flex-col gap-2">
                    <Label>{field.label}</Label>
                    <Input
                      key={index}
                      className="text-white"
                      error={!!field.error}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {field.error && (
                      <span className="text-danger text-xs mt-1">{field.error}</span>
                    )}
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    variant="default"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-secondary text-white hover:bg-secondary/90"
                    variant="default"
                    disabled={step === 3 && !withdrawalMethod}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div
                aria-label="Withdrawal request confirmation"
                className="flex flex-col gap-6 items-center text-zinc-100"
                role="region"
              >
                <Chip
                  color="success"
                  size="lg"
                  variant="solid"
                  className="text-white bg-green-500"
                  role="status"
                  aria-label="Success status"
                >
                  Withdrawal Request Successful!
                </Chip>

                <div
                  aria-label="Withdrawal details"
                  className="w-full space-y-4"
                  role="list"
                >
                  {[
                    { label: "Amount", value: `₹${amount}` },
                    { label: "Account Holder", value: accountHolderName },
                    { label: "Bank Name", value: bankName },
                    { label: "Account Number", value: accountNumber },
                    { label: "IFSC Code", value: ifscCode },
                    { label: "Phone Number", value: phone },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between"
                      role="listitem"
                    >
                      <span className="text-zinc-300">{item.label}:</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <p
                  aria-label="Processing time information"
                  className="text-center text-zinc-300 mt-4"
                  role="note"
                >
                  You will receive the funds in your account within{" "}
                  <span className="font-medium text-zinc-100">
                    2 to 3 working days
                  </span>
                  .
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </UserDefaultLayout>
  );
};

export default Withdraw;
