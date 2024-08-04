import React, { useId, ForwardedRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  type?: 'submit' | 'text' | 'button' | 'password' | 'email'|'search'|"file";
}

const Input = React.forwardRef(function Input(
  {
    label,
    placeholder= '',
    type = 'text',
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-sm text-black font-medium text-left py-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="border text-black rounded-xl p-2 mt-1 mb-2"
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default Input;
