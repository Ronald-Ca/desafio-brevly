import { useDownloadLinksCSV } from '../../../../queries/link';
import { FiLoader } from "react-icons/fi";
import './style.css';

export default function DownloadCsvButton() {
    const downloadQuery = useDownloadLinksCSV();

    const handleClick = async () => {
        const { data } = await downloadQuery.refetch();
        if (data) {
            window.open(data, '_blank');
        }
    };

    return (
        <button
            className="csv-button"
            onClick={handleClick}
            disabled={downloadQuery.isFetching}
        >
            {downloadQuery.isFetching ? (
                <FiLoader className="icon-spin" size={18} />
            ) : (
                <img src="/icons/download.svg" alt="Baixar CSV" />
            )}
            {downloadQuery.isFetching ? 'Gerando...' : 'Baixar CSV'}
        </button>
    );
}
