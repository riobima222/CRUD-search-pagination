import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(11),
});

export const action = async (prevState: any, formData: FormData) => {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
    cache: "no-store",
  });
  if (res.ok) {
    return { success: true };
  } else {
    return { message: "Failed to create contact" };
  }
};
