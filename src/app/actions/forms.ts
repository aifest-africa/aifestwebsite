import { z } from "zod";

export type ActionResult = {
  ok: boolean;
  message: string;
};

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function subscribeToNewsletter(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const email = formData.get("email");
    const validated = newsletterSchema.parse({ email });

    // Removed Supabase call - static mock
    console.log("Newsletter signup:", validated.email);

    return {
      ok: true,
      message: "Successfully subscribed to the newsletter!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.issues[0]?.message || "Invalid input",
      };
    }
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

const involvementSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  organization: z.string().optional(),
  message: z.string().optional(),
});

export async function submitInvolvement(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      organization: formData.get("organization") || undefined,
      message: formData.get("message") || undefined,
    };

    const validatedInfo = involvementSchema.parse(rawData);

    // Removed Supabase call - static mock
    console.log("Involvement submission:", validatedInfo);

    return {
      ok: true,
      message: "Thank you for your interest! We will be in touch soon.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.issues[0]?.message || "Invalid input",
      };
    }
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
