import './Sidebar.css'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-opations">
            <NavLink to='/add' className="sidebar-opation">
                <img src={assets.add_icon} alt="add" />
                <p>Add items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-opation">
                <img src={assets.order_icon} alt="add" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-opation">
                <img src={assets.order_icon} alt="add" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar;