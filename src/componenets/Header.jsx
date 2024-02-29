import { Link } from 'react-router-dom';
import RequestFormat from './RequestFormat';
import bgImageIcon from "/img/movie-icon.png";

function Header(){
    return(
        <header className="content-header">
            <Link to="/home">
                <div className="header-menu">
                    <img className="home-icon" src={bgImageIcon} />
                    <span className="company-name">Damzxyno's Movie Archive</span>
                </div>
            </Link>
            	
                <div className="header-search">
                    <input className="header-search-input noborder" type="search" placeholder="Type movie name e.g, Legend of the seeker" />
                    <button className="search-button noborder" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                {/* <nav class="nav-menus">
                    <Link to="/Create-Film">
                        <i class="fa-solid fa-plus"></i>
                        <span>Create a new film</span>			
                    </Link>
                </nav> */}
                <RequestFormat />
        </header>
    )
}

export default Header;