import { useState } from "react";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


import { tokens } from "../theme";


const Item = ({title, to, icon, selected, setSelected}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100]
            }}
            onClick={()=>setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}


const MySidebar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                color: "#6870fa !important",
                },
            }}
        >
            <Sidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                        margin: "10px 0 20px 0",
                        color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                            ADMINIS
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                        )}
                    </MenuItem>
                   
                    <Box paddingLeft={isCollapsed ? undefined: "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            />
                        
                    </Box>
                    <Box paddingLeft={isCollapsed ? undefined: "10%"}>
                        <Item
                            title="Vendors"
                            to="/vendors/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <MenuItem 
                            component={<Link to='/vendors/' />}
                            selected={selected}
                            setSelected={setSelected}
                            title="Vendors"
                            onClick={()=>(console.log('ff'))}>Vendors 
                        </MenuItem>
                        <MenuItem 
                            component={<Link to='/incomes/' />}
                            selected={selected}
                            setSelected={setSelected}
                            title="Vendors"
                            >Incomes 
                        </MenuItem>
                        <MenuItem 
                            component={<Link to='/analysis/' />}
                            selected={selected}
                            setSelected={setSelected}
                            title="Vendors"
                            >Analysis 
                        </MenuItem>
                        <MenuItem 
                            component={<Link to='/logout/' />}
                            selected={selected}
                            setSelected={setSelected}
                            title="Logout"
                            >Logout 
                        </MenuItem>
                       
                                
                            
                            
                        
                    </Box>
                </Menu>
          </Sidebar>
        </Box>
    )
}

export default MySidebar;