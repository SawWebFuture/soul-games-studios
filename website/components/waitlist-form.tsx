"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setState("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setState("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.ok) {
        setState("success");
        setEmail("");
      } else {
        setState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setState("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-medium text-green-800">
          Thank you! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={state === "loading"}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
      {state === "error" && errorMessage && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
