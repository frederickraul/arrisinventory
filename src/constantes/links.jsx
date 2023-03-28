import React from "react";
import {
    AiOutlineHome,
    AiOutlinePercentage,
    AiOutlineSetting,
    AiOutlineUsergroupAdd,
  } from "react-icons/ai";

  import { MdLogout, MdOutlineListAlt,MdAttachMoney,MdOutlineInventory2, MdOutlineCategory} from "react-icons/md";
import { BsPeople } from "react-icons/bs";

export const linksArray = [
    {
        label: "Inicio",
        icon: <AiOutlineHome />,
        to: "/",
        notification: 0,
    },
    {
        label: "Inventario",
        icon: <MdOutlineInventory2 />,
        to: "/inventario",
        notification: 0,
        submenu:[
            {label: 'Agregar inventario', to: '/inventario/crear'},
            {label: 'Administrar inventario', to: '/inventario/'},
        ]
    },
    {
        label: "Proveedores",
        icon: <BsPeople />,
        to: "/proveedores",
        notification: 0,
        submenu:[
            {label: 'Agregar proveedor', to: '/proveedores/crear'},
            {label: 'Administrar proveedor', to: '/proveedores/'},
        ]
        
    },
    {
        label: "Cotizacion",
        icon: <MdAttachMoney />,
        to: "/cotizacion",
        notification: 0,
        submenu:[
            {label: 'Agregar cotizacion', to: '/cotizacion/crear'},
            {label: 'Administrar cotizacion', to: '/cotizacion/'},
        ]
        
    },
    {
        label: "Listas",
        icon: <MdOutlineListAlt />,
        to: "/listas",
        notification: 0,
        submenu:[
            {label: 'Agregar lista', to: '/listas/crear'},
            {label: 'Administrar lista', to: '/listas/'},
        ]
    },
    
];

export const secondaryLinksArray = [
    {
        label: "Ajustes",
        icon: <AiOutlineSetting />,
        to: "/ajustes",
    }
];

export const settingsLinksArray = [
    {
        label: "Categorias",
        icon: <MdOutlineCategory />,
        to: "/ajustes/categorias",
    },
    {
        label: "IVA",
        icon: <AiOutlinePercentage />,
        to: "#",
    },
    {
        label: "Usuarios",
        icon: <AiOutlineUsergroupAdd />,
        to: "/ajustes/usuarios",
    },
];

