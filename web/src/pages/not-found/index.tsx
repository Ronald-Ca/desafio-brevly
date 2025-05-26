import './style.css'

export default function NotFound() {
    return (
        <div className="container-not-found">
            <div className='content-not-found'>
                <img src="/not-found.svg" alt="Ícone página de redirecionamento" />
                <h4 className="text-xl">Link não encontrado</h4>
                <p className="text-md">O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href='/'>brev.ly.</a></p>
            </div>
        </div>
    );
}