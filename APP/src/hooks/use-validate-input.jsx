import { useState } from "react";
import { z } from "zod";

export function useValidateInput({ schema }) {
  const zodSchema = Object.entries(schema).reduce((acc, [key, rules]) => {
    let fieldSchema = z.string();

    const ruleSet = rules.split("|");

    if (ruleSet.includes("required")) {
      fieldSchema = fieldSchema.min(1, `${key} is required`);
    }
    if (ruleSet.includes("email")) {
      fieldSchema = fieldSchema.email(`${key} is not a valid email`);
    }
    if (ruleSet.includes("password")) {
      fieldSchema = fieldSchema
        .min(8, `${key} must be at least 8 characters`)
        .refine((value) => {
          const regEx =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
          return regEx.test(value);
        }, `${key} must contain at least one lowercase letter, one uppercase letter, one number, and one special character`);
    }
    if (ruleSet.includes("number")) {
      fieldSchema = fieldSchema.refine(
        (value) => !isNaN(Number(value)),
        `${key} must be a number`
      );
    }

    const min = rules.match(/min:(\d+)/)?.[1];
    if (min) {
      fieldSchema = fieldSchema.min(
        Number(min),
        `${key} must be at least ${min} characters`
      );
    }

    const max = rules.match(/max:(\d+)/)?.[1];
    if (max) {
      fieldSchema = fieldSchema.max(
        Number(max),
        `${key} must be at most ${max} characters`
      );
    }

    const number_min = rules.match(/number_min:(\d+)/)?.[1];
    if (number_min) {
      fieldSchema = fieldSchema.refine(
        (value) => Number(value) >= Number(number_min),
        `${key} must be at least ${number_min}`
      );
    }

    const number_max = rules.match(/number_max:(\d+)/)?.[1];
    if (number_max) {
      fieldSchema = fieldSchema.refine(
        (value) => Number(value) <= Number(number_max),
        `${key} must be at most ${number_max}`
      );
    }

    const mime = rules.match(/mime:([^|]+)/)?.[1];
    if (mime) {
      const mimeTypes = mime.split("|");
      fieldSchema = fieldSchema.refine((file) => {
        const ext = file.split(".").pop();
        return mimeTypes.includes(ext);
      }, `${key} must have a valid mime type (${mimeTypes.join(", ")})`);
    }

    const extensions = rules.match(/extensions:([^|]+)/)?.[1];
    if (extensions) {
      const extensionsArray = extensions.split("|");
      fieldSchema = fieldSchema.refine(
        (file) => extensionsArray.some((ext) => file.name.endsWith(ext)),
        `${key} must have a valid extension (${extensionsArray.join(", ")})`
      );
    }

    acc[key] = fieldSchema;
    return acc;
  }, {});

  const validationSchema = z.object(zodSchema);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    const result = validationSchema.safeParse({ ...values, [key]: value });
    if (result.success) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setValid(true);
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [key]: fieldErrors[key]?.[0] ? (
          <small className="text-xs text-red-500 p-0 m-0">
            {fieldErrors[key]?.[0]}
          </small>
        ) : undefined,
      }));
      setValid(false);
    }
  };

  return {
    valid,
    errors,
    handleChange,
  };
}
