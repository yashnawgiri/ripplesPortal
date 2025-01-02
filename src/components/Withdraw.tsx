"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import UserDefaultLayout from "@/layouts/userDefault";

const Withdraw = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
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
      <Card className="max-w-lg mx-auto bg-primary text-white p-8 shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold">Withdraw Funds</h3>
        </CardHeader>
        <CardBody>
          {step === 1 && (
            <>
              <p className="text-white text-sm mb-4">Enter withdrawal amount</p>
              <Input
                placeholder="Enter amount"
                variant="underlined"
                color="primary"
                className="bg-primary text-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
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
                variant="underlined"
                color="primary"
                value={withdrawalMethod}
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
                  onSubmit={handleSubmit}
                  className="space-y-6 w-full text-white"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Account Holder Name
                      </label>
                      <Input
                        variant="underlined"
                        placeholder="Enter account holder name"
                        color="primary"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Bank Name
                      </label>
                      <Input
                        variant="underlined"
                        color="primary"
                        placeholder="Enter bank name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Account Number
                      </label>
                      <Input
                        variant="underlined"
                        color="primary"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        IFSC Code
                      </label>
                      <Input
                        variant="underlined"
                        color="primary"
                        placeholder="Enter IFSC code"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <Button
                      onPress={handleBack}
                      color="primary"
                      type="button"
                      className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-gray-300 hover:text-black"
                    >
                      Back
                    </Button>
                    <Button
                      color="success"
                      type="submit"
                      className="px-4 py-2 text-sm font-medium bg-secondary text-white rounded-md hover:bg-secondary/90"
                    >
                      Submit Withdrawal
                    </Button>
                  </div>
                </form>
              )}
              {withdrawalMethod === "paypal" && (
                <Input
                  variant="underlined"
                  color="primary"
                  label="PayPal Email"
                  classNames={{ label: "text-white" }}
                  placeholder="Enter PayPal email"
                  type="email"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              )}
              {withdrawalMethod === "crypto" && (
                <Input
                  variant="underlined"
                  color="primary"
                  label="Cryptocurrency Wallet Address"
                  classNames={{ label: "text-white" }}
                  placeholder="Enter cryptocurrency wallet address"
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
              <div className="mb-4 border-t border-gray-600"></div>
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
              <div className="my-4 border-t border-gray-600"></div>
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
                onPress={handleBack}
                color="primary"
                disabled={step === 1}
              >
                Back
              </Button>
              <Button onPress={handleNext} color="secondary">
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
