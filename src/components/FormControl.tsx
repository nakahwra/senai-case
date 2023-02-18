import { HTMLInputTypeAttribute } from "react";

interface FormControlProps {
  label: string;
  name: string;
  inputType: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
}

function FormControl({
  label,
  name,
  inputType,
  value,
  onChange,
  required = false,
  min,
}: FormControlProps) {
  return (
    <label className="flex flex-col w-full">
      {label}:
      <input
        name={name}
        className="px-4 py-2 mt-4 rounded-md bg-slate-900"
        type={inputType}
        value={value}
        onChange={onChange}
        {...(required && { required })}
        minLength={min}
      />
    </label>
  );
}

export default FormControl;
