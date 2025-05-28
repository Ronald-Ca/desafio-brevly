import { FiLoader } from 'react-icons/fi'
import './style.css'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <div className="loading-container">
      <FiLoader className="icon-spin" size={30} />
      <p className="loading-message">{message}</p>
    </div>
  )
}
