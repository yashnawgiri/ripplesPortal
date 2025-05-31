import type React from "react";

import { useState } from "react";
import { Download } from "lucide-react";
import axios from "axios";

import { Button } from "../ugc-landing/ui/button";
import { Input } from "../ugc-landing/ui/input";
import { Label } from "../ugc-landing/ui/label";

interface LeadFormProps {
  buttonText?: string;
}

export default function LeadForm({
  buttonText = "Yes, I Want My Free Audit",
}: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setIsSubmitted(true);
    // Reset form after submission
    await axios.post(
      "https://free-tools-function-app.azurewebsites.net/api/captureCROResourceShareLead",
      {
        email,
        name,
        website,
        organisation,
      },
    );

    setIsSubmitting(false);
    setEmail("");
    setName("");
    setWebsite("");
  };

  return (
    <div className="w-full px-4 sm:px-6">
      {isSubmitted ? (
        <div className="rounded-lg bg-green-900 p-6 text-center">
          <h3 className="text-lg font-medium text-white">Thank you!</h3>
          <p className="mt-2 text-sm text-green-100">
            Check your email for your free CRO checklist and audit details.
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              required
              id="name"
              placeholder="Your name"
              className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              required
              id="email"
              placeholder="you@company.com"
              className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organisation" className="text-white">Organisation</Label>
            <Input
              required
              id="organisation"
              placeholder="Your organisation"
              className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
              type="text"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-white">Website URL</Label>
            <Input
              required
              id="website"
              placeholder="https://yourwebsite.com"
              className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg px-4 py-3 sm:px-8 sm:py-6 rounded-xl transition-all duration-200 shadow-lg transform truncate"
            disabled={isSubmitting}
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Submitting..." : buttonText}
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-center text-sm text-gray-300">
            No credit card required. No spam.
          </p>
        </form>
      )}
    </div>
  );
}
