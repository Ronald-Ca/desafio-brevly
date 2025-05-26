import React from 'react';
import './style.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    prefix?: string;
    error?: string;
}

export default function Input({ label, prefix, error, ...rest }: InputProps) {
    return (
        <div className={`container-input ${error ? 'error' : ''}`}>
            <label className="text-xs">{label}</label>

            <div className={`input-wrapper ${error ? 'error' : ''}`}>
                {prefix && <span className="input-prefix">{prefix}</span>}
                <input
                    type="text"
                    className={`input ${error ? 'error' : ''}`}
                    {...rest}
                />
            </div>

            {error && (
                <div className="error-message">
                    <img src="/icons/warning.svg" alt="Erro" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
