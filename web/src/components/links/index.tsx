import { RiDeleteBin6Line } from 'react-icons/ri';
import './style.css'
import { PiCopyBold } from 'react-icons/pi';

interface LinksProps {
    link: string
    shortLink: string
    visits: number
    onCopy: () => void;
    onDelete: () => void;
}
export default function Links({ link, shortLink, visits, onCopy, onDelete }: LinksProps) {

    return (
        <div className="container-links">
            <div className="link-item">
                <a
                    className="text-md"
                    href={shortLink}
                    target="_blank"
                >
                    {shortLink}
                </a>

                <p className='text-sm'>{link}</p>
            </div>
            <div className="link-actions">
                <p className='text-sm'>{visits} acessos</p>
                <button onClick={onCopy}><PiCopyBold className='color-icon' size={18} /></button>
                <button onClick={onDelete}><RiDeleteBin6Line className='color-icon' size={18} /></button>
            </div>
        </div>
    );
}
