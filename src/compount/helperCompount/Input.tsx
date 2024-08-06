import { ClassNames } from '@emotion/react';
import React, { useId, ForwardedRef, InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  className?:string;
  type?: 'submit' | 'text' | 'button' | 'password' | 'email'|'search'|"file";
}

const Input = React.forwardRef(function Input(
  {
    label='',
    placeholder= '',
    type = 'text',
    className='',
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  const [preview, setPreview] = useState(null);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-sm text-black font-medium text-left py-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`border ${className} text-black rounded-xl p-2 mt-1 mb-2`}
        ref={ref}
        id={id}
      />
       {type === 'file' && preview && (
        <div>
          <img src={preview} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
});

export default Input;
