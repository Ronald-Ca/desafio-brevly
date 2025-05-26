import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './style.css';
import api from '../../lib/axios';
import { useQueryClient } from '@tanstack/react-query';
import { LinksQueryKey } from '../../queries/link';

export default function Redirect() {
  const queryClient = useQueryClient()
  const { code } = useParams<{ code: string }>()
  const [notFound, setNotFound] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
  const calledRef = useRef(false)

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    const fetchLink = async () => {
      try {
        const res = await api.get(`/${code}`)
        setRedirectUrl(res.data.link)
        queryClient.refetchQueries({ queryKey: [LinksQueryKey.LINKS] })
      } catch {
        setNotFound(true)
      }
    }

    fetchLink()
  }, [code, queryClient])

  useEffect(() => {
    if (redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [redirectUrl])

  if (notFound) return <Navigate to="*" replace />

  return (
    <div className="container-redirect">
      <div className="content-redirect">
        <img src="subtract.svg" alt="Ícone página de redirecionamento" />
        <h4 className="text-xl">Redirecionando...</h4>
        <p className="text-md">
          Você será levado automaticamente em instantes.
          <br />
          Não redirecionou? <a href={`#`}>Clique aqui</a>
        </p>
      </div>
    </div>
  );
}
