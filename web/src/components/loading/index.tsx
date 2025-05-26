import './style.css'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-message">{message}</p>
    </div>
  )
}
