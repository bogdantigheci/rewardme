import React from 'react';
import { Link } from 'react-scroll';

const sideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="about" smooth className="nav-link js-scroll">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="projects" smooth className="nav-link js-scroll">
            Work
          </Link>
        </li>
        <li className="nav-item">
          <Link to="certificates" smooth className="nav-link js-scroll">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
