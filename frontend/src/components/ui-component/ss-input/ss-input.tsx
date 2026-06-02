import { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

interface SSInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  error?: FieldError;
  autoComplete?: string;
  autoFocus?: boolean;
}

const SSInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  register,
  validation,
  error,
  autoComplete,
  autoFocus
}: SSInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full min-w-0 flex flex-col gap-1.5">
      {/* Outer Integrated Card Container */}
      <div
        className={`flex items-center gap-3.5 w-full rounded-xl border bg-[#0b1120]/40 px-4 py-2.5 transition-all duration-300 ${
          error
            ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10"
            : "border-slate-200 dark:border-slate-700/60 hover:border-blue-400/40 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
        }`}
      >
        {/* Left Icon (Envelope, Lock, etc.) */}
        {icon && (
          <span className="flex items-center text-slate-400 dark:text-blue-300/80 shrink-0 text-base">
            <i className={icon}></i>
          </span>
        )}

        {/* Text Area Content Stack */}
        <div className="flex flex-col flex-grow min-w-0">
          <label
            htmlFor={name}
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400/80 mb-0.5"
          >
            {label}
          </label>
          <input
            type={inputType}
            id={name}
            className="w-full bg-transparent p-0 border-none outline-none focus:ring-0 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-slate-400/60 dark:placeholder-slate-500"
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            {...register(name, validation)}
          />
        </div>

        {/* Password Eye Visibility Toggle Trigger */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center text-slate-400 hover:text-slate-300 transition-colors pl-1 shrink-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            <i className={showPassword ? "fi fi-rr-eye" : "fi fi-rr-eye-crossed"}></i>
          </button>
        )}
      </div>

      {/* Input Field Validation Error Message */}
      {error && (
        <p className="text-red-400 text-xs font-medium pl-2 w-full break-words overflow-hidden">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SSInput;
