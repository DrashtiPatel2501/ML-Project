import React from 'react';

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  prefix,
  suffix,
  icon: Icon,
  min,
  max,
  step,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}

      <div className="relative rounded-xl shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-medium text-sm">
            {prefix}
          </div>
        )}

        {Icon && !prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          required={required}
          className={`block w-full rounded-xl border bg-white py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${
            prefix || Icon ? 'pl-9' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'} ${
            error
              ? 'border-rose-300 focus:ring-rose-400 focus:border-rose-400 bg-rose-50/30 text-rose-900'
              : 'border-slate-200 hover:border-slate-300 focus:ring-brand-500 focus:border-brand-500'
          } ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200' : ''}`}
          {...props}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 text-xs font-medium">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
