"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/lib/ui";
import { submitInvolvement, type ActionResult } from "../../app/actions/forms";

export function InvolvementForm() {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    submitInvolvement,
    null,
  );

  return (
    <form action={action} className="mt-6 grid gap-4">
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <motion.label 
          className="flex flex-col gap-2"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-xs font-medium tracking-wide text-foreground/60">
            Role
          </span>
          <motion.select
            name="role"
            required
            whileFocus={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-11 rounded-2xl border-2 border-[#001F3F]/10 bg-white px-4 text-sm font-medium outline-none aifest-smooth hover:border-[#00D9FF]/50 focus-visible:border-[#00D9FF] focus-visible:ring-4 focus-visible:ring-cyan-500/20 focus-visible:shadow-lg focus-visible:shadow-cyan-500/20"
            defaultValue="student"
          >
            <option value="student">Student / builder</option>
            <option value="volunteer">Volunteer</option>
            <option value="speaker">Speaker / mentor</option>
            <option value="partner">Partner / sponsor</option>
          </motion.select>
        </motion.label>

        <Field name="name" label="Name" placeholder="Your name" required />
        <Field
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          required
        />
        <div className="md:col-span-2">
          <motion.label 
            className="flex flex-col gap-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-xs font-medium tracking-wide text-foreground/60">
              Message (optional)
            </span>
            <motion.textarea
              name="message"
              rows={4}
              placeholder="What do you want to contribute?"
              whileFocus={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border-2 border-[#001F3F]/10 bg-white px-4 py-3 text-sm font-medium outline-none aifest-smooth placeholder:text-[#001F3F]/40 hover:border-[#00D9FF]/50 focus-visible:border-[#00D9FF] focus-visible:ring-4 focus-visible:ring-cyan-500/20 focus-visible:shadow-lg focus-visible:shadow-cyan-500/20"
            />
          </motion.label>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending} className="sm:w-auto">
          {pending ? "Sending…" : "Submit interest"}
        </Button>
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
      </div>
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


