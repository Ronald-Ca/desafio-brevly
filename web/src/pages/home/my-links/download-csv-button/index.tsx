import { useDownloadLinksCSV } from '../../../../queries/link';
import { FiLoader } from "react-icons/fi";
import './style.css';
import { MdOutlineFileDownload } from 'react-icons/md';

interface DownloadCsvButtonProps {
    disabled?: boolean;
}
export default function DownloadCsvButton({ disabled }: DownloadCsvButtonProps) {
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
            disabled={downloadQuery.isFetching || disabled}
        >
            {downloadQuery.isFetching ? (
                <FiLoader className="icon-spin" size={18} />
            ) : (
                <MdOutlineFileDownload size={18} />
            )}
            Baixar CSV
        </button>
    );
}
