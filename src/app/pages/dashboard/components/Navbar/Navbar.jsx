import { FaPizzaSlice } from 'react-icons/fa';
import { BiSolidDrink } from 'react-icons/bi';
import { GiSodaCan } from 'react-icons/gi';
import LogoPizza from '../../ImagenesMenu/LogoPizza.png';
import './Navbar.css';

export default function NavBar() {
  return (
    <nav className='nav-container'>
      <div className='nav-content'>
        <a className='nav-logo' href="/">
          <img src={LogoPizza} alt="Logo Pizza" />
        </a>
        <div className='nav-items'>
            <a href="#pizzas" className='nav-item'>
            <FaPizzaSlice className="nav-icon" /> PIZZAS
          </a>
          <a href="#gaseosas" className='nav-item'>
            <GiSodaCan className="nav-icon" /> GASEOSAS
          </a>
          <a href="#bebidas" className='nav-item'>
            <BiSolidDrink className="nav-icon" /> BEBIDAS
          </a>
        </div>
      </div>
    </nav>
  );
}
