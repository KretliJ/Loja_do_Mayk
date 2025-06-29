import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function TextInput({ label, error, className = "", ...props }: TextInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`p-2 border border-gray-300 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      {/* Lucas: Conteúdo do main com tema responsivo */}
      {error && (
        <p
          id={`${props.id}-error`}
          className="text-red-500 text-sm w-full text-center mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
