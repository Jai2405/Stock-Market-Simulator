import { Link } from "react-router-dom";

export default function NavBar() {
    return (    
        <nav className="nav">
            <div className="title">
                <img src="/bull-horns-svgrepo-com.svg" alt="Bull Horns" />
                <a href="/" className="brand">Bull&Bear</a>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/portfolio">Portfolio</Link>
                </li>                 
            </ul>
        </nav>
    );
}
