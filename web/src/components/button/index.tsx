import './style.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export default function Button({ children, ...rest }: ButtonProps) {
    return (
        <button className='button text-md' {...rest}>
            {children}
        </button>
    );
}