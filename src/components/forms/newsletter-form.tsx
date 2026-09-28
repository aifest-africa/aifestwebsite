"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/lib/ui";
import { subscribeToNewsletter, type ActionResult } from "../../app/actions/forms";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    subscribeToNewsletter,
    null,
  );

  return (
    <form action={action} className="mt-6 flex flex-col gap-3">
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Field name="name" label="Name (optional)" placeholder="Your name" />
        <Field
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          required
        />
        <div className="flex items-end">
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Saving…" : "Get involved"}
          </Button>
        </div>
      </div>

      {state ? (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={
            state.ok
              ? "text-sm text-foreground/70"
              : "text-sm text-red-600"
          }
        >
          {state.message}
        </motion.p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <motion.label
      className="flex flex-col gap-2"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="text-xs font-medium tracking-wide text-foreground/60">
        {label}
      </span>
      <motion.input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        whileFocus={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-11 rounded-2xl border-2 border-[#001F3F]/10 bg-white px-4 text-sm font-medium outline-none aifest-smooth placeholder:text-[#001F3F]/40 hover:border-[#00D9FF]/50 focus-visible:border-[#00D9FF] focus-visible:ring-4 focus-visible:ring-cyan-500/20 focus-visible:shadow-lg focus-visible:shadow-cyan-500/20"
      />
    </motion.label>
  );
}


