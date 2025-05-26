import Button from '../../../components/button';
import Input from '../../../components/input';
import './style.css'
import { LinkFormData, linkSchema } from '../../../validations/new-link-zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { LinksQueryKey, useCreateLink } from '../../../queries/link';
import { toast } from 'react-toastify';
import AlertMessage from '../../../components/alert';
export default function NewLink() {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LinkFormData>({
        resolver: zodResolver(linkSchema),
    })

    const { mutate: createLink, isPending } = useCreateLink({
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [LinksQueryKey.LINKS] })
            reset()
            toast.success(AlertMessage({ title: 'Link criado com sucesso', message: 'O link foi criado e está disponível.' }));
        },
        onError: (error) => {
            const message = error.response?.data?.message ?? 'Erro desconhecido'
            console.error('Erro ao criar link:', message)
            toast.error(AlertMessage({ title: 'Erro ao criar link', message: message }));
        },
    })

    const onSubmit = (data: LinkFormData) => {
        createLink(data)
    }

    return (
        <form className="container-new-link" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-lg">Novo Link</h4>

            <div className="container-inputs">
                <Input
                    label="Link Original"
                    placeholder="https://exemplo.com.br"
                    {...register('link')}
                    error={errors.link?.message}
                />

                <Input
                    label="Link Encurtado"
                    prefix="brev.ly/"
                    {...register('shortLink')}
                    error={errors.shortLink?.message}
                />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : 'Salvar link'}
            </Button>
        </form>
    )
}