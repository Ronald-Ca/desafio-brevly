import { useQuery, useMutation } from '@tanstack/react-query'
import api from '../lib/axios'
import { AxiosError } from 'axios'
import { APIErrorResponse } from '../types/api-error'

export enum LinksQueryKey {
    LINKS = 'links',
}

// Get all links
export function useLinks() {
    return useQuery({
        queryKey: [LinksQueryKey.LINKS],
        queryFn: async () => {
            const { data } = await api.get<Link[]>('/link',)
            return data
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })
}

// Create a new link
export const useCreateLink = ({ onSuccess, onError }: { onSuccess: (data: null) => void; onError: (error: AxiosError<APIErrorResponse>) => void }) => {
    return useMutation({
        mutationFn: async (message: CreateLink) => {
            const response = await api.post(`/link`, message)

            return response.data
        },
        onError,
        onSuccess,
    })
}

// Delete a link
export const useDeleteLink = ({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError: (error: AxiosError<APIErrorResponse>) => void;
}) => {
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/link/${id}`,);
        },
        onSuccess,
        onError,
    });
};

// Download links as CSV
export const useDownloadLinksCSV = () => {
    return useQuery({
        queryKey: [...LinksQueryKey.LINKS, 'csv'],
        queryFn: async () => {
            const { data } = await api.get<string>('/link/download-csv', {
                headers: {
                    Accept: 'text/csv',
                },
                responseType: 'blob',
            });
            return data;
        },
        enabled: false,
    });
};

export interface Link {
    id: string
    link: string
    shortLink: string
    visits: number
}

export interface CreateLink {
    link: string,
    shortLink: string,
}