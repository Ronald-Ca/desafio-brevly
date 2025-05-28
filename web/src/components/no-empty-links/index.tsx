import { IoIosLink } from 'react-icons/io'
import './style.css'
export default function NoEmptyLinks() {
    return (
        <div className="container-no-empty-links">
            <IoIosLink size={30}/>
            <h4 className="text-xs">Ainda não existem links cadastrados</h4>
        </div>
    )
}