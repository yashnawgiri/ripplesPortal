import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import UserDefaultLayout from "@/layouts/userDefault";

const Withdraw = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [phone, setPhone] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Withdrawal submitted:", {
      amount,
      withdrawalMethod,
      accountNumber,
      bankName,
      ifscCode,
      accountHolderName,
    });
    setStep(4); // Move to confirmation step
  };

  return (
    <UserDefaultLayout>
      <Card className="max-w-lg mx-auto bg-transparent text-white p-8 ">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold">Withdraw Funds</h3>
        </CardHeader>
        <CardBody>
          {step === 1 && (
            <>
              <p className="text-white text-sm mb-4">Enter withdrawal amount</p>
              <Input
                className="bg-primary text-white"
                color="primary"
                placeholder="Enter amount"
                type="number"
                value={amount}
                variant="underlined"
                onChange={(e) => setAmount(e.target.value)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-white text-sm mb-4">
                Select withdrawal method
              </p>
              <Select
                className="bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                color="primary"
                value={withdrawalMethod}
                variant="underlined"
                onChange={(e) =>
                  setWithdrawalMethod(e.target.value as unknown as string)
                }
              >
                <SelectItem key="bank" value="bank">
                  Bank Transfer
                </SelectItem>
              </Select>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-white text-xl mb-4">Enter account details</h3>
              {withdrawalMethod === "bank" && (
                <form
                  className="space-y-6 w-full text-white"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Account Holder Name
                      </label>
                      <Input
                        required
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        color="primary"
                        inputMode="text"
                        placeholder="Enter account holder name"
                        value={accountHolderName}
                        variant="underlined"
                        onChange={(e) => setAccountHolderName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Bank Name
                      </label>
                      <Input
                        required
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        color="primary"
                        inputMode="text"
                        placeholder="Enter bank name"
                        value={bankName}
                        variant="underlined"
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Account Number
                      </label>
                      <Input
                        required
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        color="primary"
                        inputMode="numeric"
                        placeholder="Enter account number"
                        value={accountNumber}
                        variant="underlined"
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        IFSC Code
                      </label>
                      <Input
                        required
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        color="primary"
                        inputMode="text"
                        placeholder="Enter IFSC code"
                        value={ifscCode}
                        variant="underlined"
                        onChange={(e) => setIfscCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        required
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        color="primary"
                        inputMode="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        variant="underlined"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <Button
                      className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-gray-300 hover:text-black"
                      color="primary"
                      type="button"
                      onPress={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      className="px-4 py-2 text-sm font-medium bg-secondary text-white rounded-md hover:bg-secondary/90"
                      color="success"
                      type="submit"
                    >
                      Submit Withdrawal
                    </Button>
                  </div>
                </form>
              )}
              {withdrawalMethod === "paypal" && (
                <Input
                  classNames={{ label: "text-white" }}
                  color="primary"
                  label="PayPal Email"
                  placeholder="Enter PayPal email"
                  type="email"
                  variant="underlined"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              )}
              {withdrawalMethod === "crypto" && (
                <Input
                  classNames={{ label: "text-white" }}
                  color="primary"
                  label="Cryptocurrency Wallet Address"
                  placeholder="Enter cryptocurrency wallet address"
                  variant="underlined"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              )}
            </>
          )}

          {step === 4 && (
            <div className="p-4">
              <h4 className="text-xl font-bold text-center mb-4 text-white">
                Withdrawal Confirmation
              </h4>
              <div className="mb-4 border-t border-gray-600" />
              <div className="flex flex-col space-y-2 text-white">
                <p>
                  <span className="font-semibold">Amount:</span> ₹{amount}
                </p>
                <p>
                  <span className="font-semibold">Method:</span>{" "}
                  {withdrawalMethod.charAt(0).toUpperCase() +
                    withdrawalMethod.slice(1)}
                </p>
                {withdrawalMethod === "bank" && (
                  <>
                    <p>
                      <span className="font-semibold">Account Holder:</span>{" "}
                      {accountHolderName}
                    </p>
                    <p>
                      <span className="font-semibold">Bank Name:</span>{" "}
                      {bankName}
                    </p>
                    <p>
                      <span className="font-semibold">Account Number:</span>{" "}
                      {accountNumber}
                    </p>
                    <p>
                      <span className="font-semibold">IFSC Code:</span>{" "}
                      {ifscCode}
                    </p>
                    <p>
                      <span className="font-semibold">Phone Number:</span>{" "}
                      {phone}
                    </p>
                  </>
                )}
                {withdrawalMethod === "paypal" && (
                  <p>
                    <span className="font-semibold">PayPal Email:</span>{" "}
                    {accountNumber}
                  </p>
                )}
                {withdrawalMethod === "crypto" && (
                  <p>
                    <span className="font-semibold">Wallet Address:</span>{" "}
                    {accountNumber}
                  </p>
                )}
              </div>
              <div className="my-4 border-t border-gray-600" />
              <div className="text-center">
                <p className="text-green-400 text-lg font-semibold mb-2">
                  Your withdrawal request has been submitted successfully!
                </p>
                <p className="text-gray-300">
                  You will receive the funds in your account within{" "}
                  <span className="font-medium">2 to 3 working days</span>.
                </p>
              </div>
            </div>
          )}

          {step < 3 && step < 4 && (
            <div className="flex justify-between mt-6">
              <Button
                color="primary"
                disabled={step === 1}
                onPress={handleBack}
              >
                Back
              </Button>
              <Button color="secondary" onPress={handleNext}>
                Next
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </UserDefaultLayout>
  );
};

export default Withdraw;
