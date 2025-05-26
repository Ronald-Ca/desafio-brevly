import './style.css'

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
                <button onClick={onCopy}><img src="icons/copy.svg" alt="ícone de copiar" /></button>
                <button onClick={onDelete}><img src="icons/delete.svg" alt="ícone de deletar" /></button>
            </div>
        </div>
    );
}
