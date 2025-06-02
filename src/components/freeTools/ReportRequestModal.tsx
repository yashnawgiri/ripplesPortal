import type React from "react";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

import { submitReportRequest } from "../action/report";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ReportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export function ReportRequestModal({
  isOpen,
  onClose,
  username,
}: ReportRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors[name];

        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Please enter a valid email address";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.website.trim()) errors.website = "Website is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      return;
    }

    setIsSubmitting(true);

    try {
      // Convert formData to FormData for submission
      const formDataObj = {
        name: formData.name,
        email: formData.email,
        organisation: formData.company,
        website: formData.website,
        username: username,
      };

      // Call the server action instead of making the API call directly
      const result = await submitReportRequest(formDataObj);

      // const result = {
      //   success: true,
      //   message: "Form submitted successfully!",
      // };

      if (result.success) {
        console.log("Form submitted successfully:", result);
        setIsSubmitted(true);
      } else {
        console.error("Error submitting form:", result);
        setFormErrors({
          general:
            result.message ||
            "An error occurred while processing your request.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form state after animation completes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "", website: "" });
        setFormErrors({});
      }, 300);
    }
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Get Your Instagram Report
          </DialogTitle>
          <DialogDescription>
            Complete the form below and we'll email you a detailed report for @
            {username}
          </DialogDescription>
        </DialogHeader>

        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {!isSubmitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {formErrors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
                <p className="text-sm text-red-600">{formErrors.general}</p>
              </div>
            )}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                className={formErrors.name ? "border-red-500" : ""}
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className={formErrors.email ? "border-red-500" : ""}
                id="email"
                name="email"
                placeholder="your.email@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="company">Where do you work?</Label>
              <Input
                className={formErrors.company ? "border-red-500" : ""}
                id="company"
                name="company"
                placeholder="Company or organization"
                value={formData.company}
                onChange={handleChange}
              />
              {formErrors.company && (
                <p className="text-sm text-red-500">{formErrors.company}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="website">Company Website</Label>
              <Input
                className={formErrors.website ? "border-red-500" : ""}
                id="website"
                name="website"
                placeholder="https://www.example.com"
                value={formData.website}
                onChange={handleChange}
              />
              {formErrors.website && (
                <p className="text-sm text-red-500">{formErrors.website}</p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-300"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Send Me The Report"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              We've sent the detailed report for{" "}
              <span className="font-semibold text-primary">@{username}</span> to
              your email address. Please check your inbox!
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary-dark text-white"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
