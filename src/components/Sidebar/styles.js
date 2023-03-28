import styled from 'styled-components';
import { btnReset, variable } from '../../styles/variables';
import { theme } from '../../constantes';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
    width: ${({ isOpen }) => (!isOpen ? `auto` : '245px')};  
    height: 120vh;
    top: 0;
    padding: 10px;
    position: fixed;
    z-index: 1;
    background: white;
    transition: .5s ease-in-out 0s;
    z-index: 3;

    @media screen and (max-width: 768px){
        width: ${({ isOpen }) => (!isOpen ? '0' : '230px')};    
        left: ${({ isOpen }) => (isOpen ? `0px` : `-60px`)};
    }
`

export const SidebarContainerBackground = styled.div`
    transform: ${({ isOpen }) => (!isOpen ? `translateX(-160px)` : 'translateX(0px)')};
    background-color: white;
    height: 120vh;
    left: 0;
    position: fixed;
    z-index: -1;
    width: 245px;
    transition: .2s ease-in-out 0s;
    @media screen and (max-width: 768px){
        transform: ${({ isOpen }) => (!isOpen ? `translateX(-160px)` : 'translateX(0px)')};
        width: ${({ isOpen }) => (!isOpen ? '0' : '230px')};    
        left: ${({ isOpen }) => (isOpen ? `0px` : `-60px`)};
        transition: .7s ease-in-out 0s;

    }

`

export const SidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: 75px;
    right: ${({ isOpen }) => (isOpen ? `-15px` : `-40px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 0 4px ${theme.secondaryColor}, 0 0 7px ${theme.secondaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #2ba44f;
    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};

    @media screen and (max-width: 768px){
        top: 10px;
        right: ${({ isOpen }) => (isOpen ? `-16px` : `-80px`)};

    }
`;

export const SidebarLogo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-bottom: ${variable.lgSpacing};
`
export const SidebarLogoLink = styled.div`
    display: ${({ isOpen }) => (isOpen ? `flex` : `none`)};
`

export const Logo = styled.img`
    height: 40px;
`

export const SmallLogo = styled.img`
    height: 40px;
`

export const SidebarSmallLogoLink = styled.div`
    display: ${({ isOpen }) => (isOpen ? `none` : `flex`)};
    
`


export const SidebarDivider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.bg3};
    margin: ${variable.lgSpacing} 0;
`;

export const SidebarLinkContainer = styled.div`
    background: 'transparent';
    border-radius: ${variable.borderRadius};
    margin: 8px 0;
    color: ${theme.primaryColor};
    cursor: pointer;
    z-index: 99999 !important;

    :hover > div ul{
        display: flex;
    }
    
`;

export const SidebarLink = styled(Link)`
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    padding: calc(${variable.smSpacing} - 2px) 0;
    z-index: 99999 !important;
    &:hover {
       background-color: ${theme.primaryColor};
    }

    
`;

export const SidebarLinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 99999 !important;

    &:hover{
        transition: .2s ease-in-out .0s;
        color: white;
        background-color: ${theme.primaryColor};
        border-radius: ${variable.borderRadius};
    }
`;


export const SidebarLinkIcon = styled.div`
    padding: ${variable.smSpacing} ${variable.mdSpacing};
    display: flex;

    svg {
        font-size: 30px;

        @media screen and (max-width: 768px){
            font-size: 20px;
        }
    }
`;

export const SidebarLinkLabel = styled.span`
    flex: 1;
    margin-left: ${variable.smSpacing};
    z-index: 99999 !important;


`;

export const SidebarLinkNotification = styled.div`
    font-size: 14px;
    padding: calc(${variable.smSpacing} / 2) ${variable.smSpacing};
    border-radius: calc(${variable.borderRadius} / 2);
    background: ${({ theme }) => theme.primary};
    color: white;

    margin-right: ${variable.mdSpacing};
`;

export const SidebarTheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`;
export const SidebarThemeLabel = styled.span`
    display: block;
    flex: 1;
`;
export const SidebarThemeToggler = styled.button`
    ${btnReset};
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme, isActive }) => (!isActive ? theme.bg3 : theme.primary)};

    position: relative;
`;

export const SidebarToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition: 0.2s ease right;
    right: calc(100% - 18px - 1px);
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
`;

export const SidebarDropdownContainer = styled.div`
    position: relative;
    display: block;
`
export const SidebarDropdown = styled.ul`
    display: flex;
    flex-direction: column;
    top: -45px;
    left: ${({ isOpen }) => (!isOpen ? `60px` : '220px')};  
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 5px;

    @media screen and (max-width: 768px){
        left: ${({ isOpen }) => (!isOpen ? `60px` : '150px')}; 
        top:-36px; 
    }    
`
  
export const SidebarDropdownItem = styled.li`
    list-style: none;
    padding: 12px 16px;
    width: 230px;
    transition: .2s ease-in-out .0s;
    color: #000;
  
    &:hover{
        background-color: #2ba44f;
        color: #fff !important;  
    }
    
    :first-child{
        border-radius: 5px 5px 5px 5px;
    }

    :last-child{
        border-radius: 5px 5px 5px 5px;
    }
   
   
`
  

  

  
