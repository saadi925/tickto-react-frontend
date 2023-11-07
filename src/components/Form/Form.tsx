import { ChangeEvent } from "react";
import "./formStyles.css";
type LabelProps = {
  label: string;
  className?: string;
};
export const FormLabel = ({ label, className }: LabelProps) => {
  return (
    <label htmlFor={label} className={className ? className : ""}>
      {label}
    </label>
  );
};
type InputProps = {
  type: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
  placeholder: string;
  maxLength?: number;
};
export const FormInput = ({
  name,
  type,
  onChange,
  className,
  value,
  placeholder,
  maxLength,
}: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={className ? className : ""}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

type SubmitButtonProps = {
  onClick: (e: React.FormEvent) => void;
  className?: string;
  label: string;
  loading: boolean;
};

export const FormSubmit = ({
  onClick,
  className,
  label,
  loading,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={` py-1.5 px-5 border border-transparent  font-medium rounded-md text-white transition-all duration-500   hover:bg-border-500 text-xl  ${
        loading ? "bg-gray-500 hover:bg-opacity-50" : "bg-blue-500 "
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      disabled={loading}
    >
      {loading ? <div className="loader"></div> : label}
    </button>
  );
};

export const FormCheckBox = () => {
  return (
    <div className={`flex gap-2`}>
      <input type="checkbox" className={""} />
      <p className={""}>I agree to all the terms and conditions of the form.</p>
    </div>
  );
};

export const FormHeader = ({
  heading,
  className,
}: {
  heading: string;
  className?: string;
}) => {
  return (
    <div className={`px-8`}>
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-400 ${className}`}
      >
        Welcome to Tickto
      </h1>
      <p className={`text-blue-400 font-semibold text-2xl sm:text-3xl   `}>
        {heading}
      </p>
      <p className={`text-md pt-2 text-gray-400`}>Best helpdesk around you.</p>
    </div>
  );
};
export const FormImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div
      className={`flex-1  bg-black object-cover hidden md:block overflow-hidden`}
    >
      <img src={src} alt={alt} className={`max-w-full w-full h-screen `} />
    </div>
  );
};
