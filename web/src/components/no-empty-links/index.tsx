import './style.css'
export default function NoEmptyLinks() {
    return (
        <div className="container-no-empty-links">
            <img src="icons/empty-link.svg" alt="Ícone de link" />
            <h4 className="text-xs">Ainda não existem links cadastrados</h4>
        </div>
    )
}