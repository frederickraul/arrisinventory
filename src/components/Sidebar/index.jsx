import React, { useState } from 'react';
import { Logo, SidebarButton, SidebarContainer, SidebarContainerBackground, SidebarDivider, SidebarDropdown, SidebarDropdownContainer, SidebarDropdownItem, SidebarLink, SidebarLinkContainer, SidebarLinkIcon, SidebarLinkLabel, SidebarLinkNotification, SidebarLinkWrapper, SidebarLogo, SidebarLogoLink, SidebarSmallLogoLink, SidebarTheme, SidebarThemeToggler, SmallLogo } from './styles';
import { newLogo, newLogoSmall } from '../../assets';

import {
  AiOutlineLeft,
} from "react-icons/ai";

import { linksArray, secondaryLinksArray } from '../../constantes';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdLogout } from 'react-icons/md';

let activeClassName = "selected";

const Sidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signout } = useAuth();

  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      //searchRef.current.focus();
    } else {
      // search functionality
    }
  };

  const handleLogOut = async () => {
    console.log('Saliendo');
    await signout();
  }

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <>
        <SidebarContainerBackground isOpen={sidebarOpen} />
        <SidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
          <AiOutlineLeft size='1.2em' />
        </SidebarButton>
      </>
      <SidebarLogo>
        <SidebarLogoLink isOpen={sidebarOpen}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }>
            <Logo src={newLogo} alt="logo" />
          </NavLink>
        </SidebarLogoLink>

        <SidebarSmallLogoLink isOpen={sidebarOpen}>
          <NavLink to='/'>
            <SmallLogo src={newLogoSmall} alt="logo" />
          </NavLink>
        </SidebarSmallLogoLink>
      </SidebarLogo>

      <SidebarDivider />
      {linksArray.map(({ icon, label, notification, to, submenu }) => (
        <SidebarLinkContainer key={label} >
          <SidebarLink to={!submenu ? to : '#'} style={!sidebarOpen ? { width: `fit-content` } : {}} >
            <SidebarLinkWrapper onClick={() => { !submenu && setSidebarOpen(false) }}>
              <SidebarLinkIcon isOpen={sidebarOpen} >{icon}</SidebarLinkIcon>
              {sidebarOpen && (
                <>
                  <SidebarLinkLabel>{label}</SidebarLinkLabel>
                  {/* if notifications are at 0 or null, do not display */}
                  {!!notification && (
                    <SidebarLinkNotification>{notification}</SidebarLinkNotification>
                  )}
                </>
              )}
            </SidebarLinkWrapper>
          </SidebarLink>
          {submenu &&
            <SidebarDropdownContainer>
              <SidebarDropdown isOpen={sidebarOpen}>
                {submenu.map((item, index) => {
                  return <Link to={item.to} key={index} onClick={() => { submenu && setSidebarOpen(false) }}>
                    <SidebarDropdownItem >
                      {item.label}
                    </SidebarDropdownItem>
                  </Link>;
                })}
              </SidebarDropdown>
            </SidebarDropdownContainer>
          }
        </SidebarLinkContainer>
      ))}
      <SidebarDivider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SidebarLinkContainer key={label}>
          <SidebarLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}} onClick={() => { setSidebarOpen(false) }}>
            <SidebarLinkWrapper>
              <SidebarLinkIcon>{icon}</SidebarLinkIcon>
              {sidebarOpen && <SidebarLinkLabel>{label}</SidebarLinkLabel>}
            </SidebarLinkWrapper>

          </SidebarLink>
        </SidebarLinkContainer>
      ))}

      <SidebarLinkContainer key={'logout'}>
        <SidebarLink to='#' style={!sidebarOpen ? { width: `fit-content` } : {}} onClick={handleLogOut}>
          <SidebarLinkWrapper>
            <SidebarLinkIcon><MdLogout /></SidebarLinkIcon>
            {sidebarOpen && <SidebarLinkLabel>Salir</SidebarLinkLabel>}
          </SidebarLinkWrapper>

        </SidebarLink>
      </SidebarLinkContainer>

    </SidebarContainer>
  );
};



export default Sidebar