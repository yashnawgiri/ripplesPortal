import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Progress,
  Chip,
} from "@nextui-org/react";
import UserDefaultLayout from "@/layouts/userDefault";
import {
  accountDetails,
  WithdrawRequestDetails,
  withdrawRequestService,
} from "@/services/apiService";
import toast from "react-hot-toast";
import { fetchWalletBalance, walletBalanceState } from "@/recoil/walletBalanceState";
import { useRecoilState, useRecoilValue } from "recoil";

interface FormErrors {
  amount: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  phone: string;
  accountHolderName: string;
  withdrawalMethod: string;
}

interface WithdrawalData {
  amount: string;
  withdrawalMethod: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  phone: string;
  accountHolderName: string;
}

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
    if (walletBalance && Number(value) > walletBalance?.wallet_balance) return "Insufficient balance";
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

      let userId = localStorage.getItem("userId") || "";
      let authToken = localStorage.getItem("authToken") || "";

      let response = await withdrawRequestService(
      userId,
      authToken,
      withdrawalData
      );

      toast.success(response.message);
      setStep(4);
    } catch (error) {
      if (error instanceof Error)
      toast.error("Insufficient balance in your account.");
      else 
      toast.error("An error occurred. Please try again later.");
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
              size="sm"
              value={(step / 3) * 100}
              className="max-w-md"
              color="secondary"
            />
          </CardHeader>
          <CardBody className="gap-4">
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <Input
                  label="Amount"
                  labelPlacement="outside"
                  color="primary"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  isInvalid={!!errors.amount}
                  errorMessage={errors.amount}
                  classNames={{
                    label: "text-zinc-200",
                    input: "text-black",
                    innerWrapper: "bg-default-100/50",
                    errorMessage: "text-danger text-xs mt-1",
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-zinc-300 text-sm">₹</span>
                    </div>
                  }
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      amount: validateAmount(e.target.value),
                    }));
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <Select
                  label="Select withdrawal method"
                  placeholder="Select a method"
                  selectedKeys={withdrawalMethod ? [withdrawalMethod] : []}
                  isInvalid={!!errors.withdrawalMethod}
                  errorMessage={errors.withdrawalMethod}
                  classNames={{
                    label: "text-zinc-200",
                    trigger: "bg-default-100/50 text-zinc-100",
                    errorMessage: "text-danger text-xs mt-1",
                  }}
                  onChange={(e) => {
                    setWithdrawalMethod(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      withdrawalMethod: validateWithdrawalMethod(
                        e.target.value
                      ),
                    }));
                  }}
                >
                  <SelectItem key="bank" className="text-zinc-800">
                    Bank Transfer
                  </SelectItem>
                </Select>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  {
                    label: "Account Holder Name",
                    value: accountHolderName,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      setAccountHolderName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        accountHolderName: validateAccountHolderName(
                          e.target.value
                        ),
                      }));
                    },
                    error: errors.accountHolderName,
                    placeholder: "Enter account holder name",
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
                  },
                ].map((field, index) => (
                  <Input
                    key={index}
                    label={field.label}
                    color="primary"
                    labelPlacement="outside"
                    placeholder={field.placeholder}
                    value={field.value}
                    isInvalid={!!field.error}
                    errorMessage={field.error}
                    onChange={field.onChange}
                    classNames={{
                      label: "text-white",
                      input: "text-black",
                      innerWrapper: "bg-default-100/50",
                      errorMessage: "text-danger text-xs mt-1",
                    }}
                  />
                ))}

                <div className="flex justify-between mt-4">
                  <Button
                    color="primary"
                    variant="bordered"
                    onPress={handleBack}
                  >
                    Back
                  </Button>
                  <Button color="secondary" type="submit">
                    Submit Withdrawal
                  </Button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6 items-center text-zinc-100">
                <Chip color="success" variant="flat" size="lg">
                  Withdrawal Request Successful!
                </Chip>

                <div className="w-full space-y-4">
                  {[
                    { label: "Amount", value: `₹${amount}` },
                    { label: "Account Holder", value: accountHolderName },
                    { label: "Bank Name", value: bankName },
                    { label: "Account Number", value: accountNumber },
                    { label: "IFSC Code", value: ifscCode },
                    { label: "Phone Number", value: phone },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-zinc-300">{item.label}:</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-zinc-300 mt-4">
                  You will receive the funds in your account within{" "}
                  <span className="font-medium text-zinc-100">
                    2 to 3 working days
                  </span>
                  .
                </p>
              </div>
            )}

            {step < 3 && (
              <div className="flex justify-between mt-4">
                <Button
                  color="secondary"
                  variant="flat"
                  isDisabled={step === 1}
                  onPress={handleBack}
                >
                  Back
                </Button>
                <Button
                  color="secondary"
                  onPress={handleNext}
                  isDisabled={step === 2 && !withdrawalMethod}
                >
                  Next
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </UserDefaultLayout>
  );
};

export default Withdraw;