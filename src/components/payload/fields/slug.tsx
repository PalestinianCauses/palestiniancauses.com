"use client";

// REVIEWED - 02

import { useField, useFormFields } from "@payloadcms/ui";
import { useEffect } from "react";
import slugify from "slugify";

type SlugFieldProps = {
  description: string;
  sourcePath: string;
  slugPath: string;
  readOnly: boolean;
  disabled: boolean;
  label: string;
};

export default function SlugField({
  description,
  sourcePath,
  slugPath,
  readOnly,
  disabled,
  label,
}: SlugFieldProps) {
  const { value: sourceValue } = useFormFields(
    ([fields]) => fields[sourcePath],
  );

  const { value: slugValue, setValue: setSlugValue } = useField({
    path: slugPath,
  });

  useEffect(() => {
    if (sourceValue === "") setSlugValue("");

    if (
      !sourceValue ||
      typeof sourceValue !== "string" ||
      sourceValue === slugValue
    )
      return;

    const slugGenerated = slugify(sourceValue, {
      strict: true,
      lower: true,
    });

    setSlugValue(slugGenerated);
  }, [sourceValue, slugValue, setSlugValue]);

  return (
    <div className="field-type text">
      <label htmlFor={slugPath} className="field-label">
        {label}
      </label>
      <input
        id={slugPath}
        value={typeof slugValue === "string" ? slugValue : ""}
        readOnly={readOnly}
        disabled={disabled}
        className="field-type__input"
      />
      <div className="field-description">{description}</div>
    </div>
  );
}
