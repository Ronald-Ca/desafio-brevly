import CsvButton from '../../../components/csv-button'
import Links from '../../../components/links'
import NoEmptyLinks from '../../../components/no-empty-links'
import { useDeleteLink, useLinks } from '../../../queries/link'
import './style.css'
import { toast } from 'react-toastify'
import Loading from '../../../components/loading'
import AlertMessage from '../../../components/alert'

export default function MyLinks() {
    const { data: links, isLoading, refetch } = useLinks()

    const deleteMutation = useDeleteLink({
        onSuccess: () => {
            toast.success(AlertMessage({
                title: 'Link deletado com sucesso',
                message: 'O link foi removido da sua lista.'
            }))
            refetch()
        },
        onError: (error) => {
            const message = error.response?.data?.message ?? 'Erro desconhecido'
            console.error('Erro ao deletar link:', error)
            toast.error(AlertMessage({
                title: 'Erro ao deletar link',
                message: message,
            }))
        },
    })

    const handleCopy = (shortLink: string) => {
        const fullShortenedLink = `${window.location.origin}/${shortLink}`
        navigator.clipboard.writeText(fullShortenedLink)
            .then(() => toast.success(AlertMessage({
                title: 'Link copiado com sucesso',
                message: 'O link encurtado foi copiado para a área de transferência.'
            })))
            .catch(() => toast.error(AlertMessage({
                title: 'Erro ao copiar link',
                message: 'Não foi possível copiar o link encurtado.'
            })))
    }

    const handleDelete = (id: string) => {
        toast.info(
            ({ closeToast }) => (
                <div>
                    <div><strong>Deseja realmente deletar?</strong></div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button onClick={() => { deleteMutation.mutate(id); closeToast?.(); }}>Confirmar</button>
                        <button onClick={closeToast}>Cancelar</button>
                    </div>
                </div>
            ),
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    return (
        <div className="container-my-links">
            {isLoading && <div className="loading-bar" />}

            <div className="header-my-links">
                <h4 className="text-lg">Meus Links</h4>
                <CsvButton disabled={links?.length === 0} />
            </div>

            <div className="list-my-links">
                {isLoading ? (
                    <Loading message="CARREGANDO LINKS..." />
                ) : !links || links.length === 0 ? (
                    <NoEmptyLinks />
                ) : (
                    links.map((link) => (
                        <Links
                            key={link.id}
                            shortLink={`${window.location.origin}/${link.shortLink}`}
                            link={link.link}
                            visits={link.visits}
                            onCopy={() => handleCopy(link.shortLink)}
                            onDelete={() => handleDelete(link.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}