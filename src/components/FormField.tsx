
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import ValidationMessages from './ValidationMessages';

interface FormFieldProps {
  label: string;
  type: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string;
  placeholder?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, type, icon, error, value, placeholder, ...props }, ref) => {
    const hasValue = value && value.length > 0;

    return (
      <div className="space-y-2">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            type={type}
            className={`
              h-12 bg-white border-slate-200 transition-all duration-200 peer
              ${icon ? 'pl-10' : 'pl-4'} pr-4 pt-6 pb-2
              focus:border-blue-500 focus:ring-blue-500/20
              ${error ? 'border-red-300 focus:border-red-500' : ''}
            `}
            placeholder=" "
            {...props}
          />
          <label className={`
            absolute ${icon ? 'left-10' : 'left-4'} transform transition-all duration-200 pointer-events-none
            peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
            peer-focus:text-xs peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-blue-600
            ${hasValue ? 'text-xs top-2 translate-y-0 text-blue-600' : 'text-base top-1/2 -translate-y-1/2 text-slate-500'}
          `}>
            {label}
          </label>
        </div>
        <ValidationMessages error={error} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
