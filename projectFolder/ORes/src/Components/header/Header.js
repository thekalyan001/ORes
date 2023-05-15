import {useEffect, useState} from "react";
import './Header-module.scss';
import { Link, NavLink, useNavigate} from "react-router-dom";
import {FaHeart, FaTimes, FaUserCircle } from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "Components/hiddenLink/hiddenLink";
import { AdminOnlyLink } from "Components/adminOnlyRoute/AdminOnlyRoute";


//at 2 places logo will be there first home page 2nd inside navigation menu
const logo = (
  <div className={"logo"}>
    <Link to="/">
    <h2>
      O<span>Reselling</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={"cart"}>
    <Link to="/cart">
      Wish 
      <FaHeart size={20} color="green"/>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        alert("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
       alert(error.message);
      });
  };

  return (
    <header>
      <div className={"header"}>
        {logo}

        <nav
          className={
            showMenu ? `${"show-nav"}` : `${"hide-nav"}`
          }
        >
          <div
            className={
              showMenu
                ? `${"nav-wrapper"} ${"show-nav-wrapper"}`
                : `${"nav-wrapper"}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={"logo-mobile"}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">SELL</button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
      
          </ul>
          <div className={"header-right"} onClick={hideMenu}>
            <span className={"links"}>

              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
              </ShowOnLogin>

              

              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>

            
                <NavLink to="/about-us" className={activeLink}>
                  About us
                </NavLink>
             

              <ShowOnLogin>
                <Link to="/" onClick={logoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>

            </span>
            <ShowOnLogin>
            {cart}
            </ShowOnLogin>
          </div>
        </nav>

        <div className={"menu-icon"}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;