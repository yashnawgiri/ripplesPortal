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
    <div className="w-full">
      {isSubmitted ? (
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <h3 className="text-lg font-medium text-green-800">Thank you!</h3>
          <p className="mt-2 text-sm text-green-700">
            Check your email for your free CRO checklist and audit details.
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              required
              id="name"
              placeholder="Your name"
              style={{ color: "black" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              placeholder="you@company.com"
              style={{ color: "black" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Organisation</Label>
            <Input
              required
              id="website"
              placeholder="Your organisation"
              style={{ color: "black" }}
              type="text"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              required
              id="website"
              placeholder="https://yourwebsite.com"
              style={{ color: "black" }}
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-secondary hover:bg-secondary-600 text-white text-lg px-8 py-6 rounded-xl transition-all duration-200 shadow-lg transform truncate"
            disabled={isSubmitting}
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Submitting..." : buttonText}
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-gray-500">
            No credit card required. No spam.
          </p>
        </form>
      )}
    </div>
  );
}
