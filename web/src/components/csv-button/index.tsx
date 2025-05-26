import './style.css';

interface CsvButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}
export default function CsvButton({ disabled, ...rest }: CsvButtonProps) {
    return (
        <button className='csv-button' disabled={disabled} {...rest}>
            <img src='/icons/download.svg' alt='Baixar CSV' />
            Baixar CSV
        </button>
    );
}