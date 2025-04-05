import { z } from "zod";

export const createCategorySchema = z
  .object({
    type: z.string().min(1, "Type is required"),
    division: z.string().optional(),
    subject: z
      .string({
        required_error: "Subject is required",
      })
      .min(1, "Subject cannot be an empty string"),
    chapter: z.string().optional(),
    universityType: z.string().optional(),
    universityName: z.string().optional(),
  })
  .strict()
  .refine(
    (data) => data.type !== "Academic" || data.division,
    {
      message: "Division is required for Academic type.",
      path: ["division"],
    }
  )
  // Subject is required for Academic type
  .refine(
    (data) => data.type !== "Academic" || data.subject,
    {
      message: "Subject is required for Academic type.",
      path: ["subject"],
    }
  )
  // Chapter is required for Academic type
  .refine(
    (data) => data.type !== "Academic" || data.chapter,
    {
      message: "Chapter is required for Academic type.",
      path: ["chapter"],
    }
  )
  // University Type is required for Admission type
  .refine(
    (data) => data.type !== "Admission" || data.universityType,
    {
      message: "University Type is required for Admission type.",
      path: ["universityType"],
    }
  )
  // University Name is required for Admission type
  .refine(
    (data) => data.type !== "Admission" || data.universityName,
    {
      message: "University Name is required for Admission type.",
      path: ["universityName"],
    }
  )
  // Subject is required for Job type
  .refine(
    (data) => data.type !== "Job" || data.subject,
    {
      message: "Subject is required for Job type.",
      path: ["subject"],
    }
  );
