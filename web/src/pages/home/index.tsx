import MyLinks from './my-links';
import NewLink from './new-link';
import './style.css';

export default function Home() {
    return (
        <div className="container-home">
            <div className='content-home'>
                <div className='container-img'>
                    <img src="logo.svg" alt="Imagem da logo" />
                </div>
                <div className='cards-home'>
                    <NewLink />
                    <MyLinks />
                </div>
            </div>
        </div>
    )
}