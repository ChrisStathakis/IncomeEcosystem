import { Box, IconButton, useTheme } from "@mui/material";
import { connect } from 'react-redux';
import { useContext, useState } from "react";
import { tokens, ColorModeContext } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';

import { searchBarAction, clearSearchBarAction } from '../../data/actions/generalActions';


const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  const [q, setQ] = useState( '')
  const handleText = (e) => {
    setQ(e.target.value)
    props.searchBarAction(q)
  }

  const clearText = e =>{
    setQ('')
    props.clearSearchBarAction();
  }

  return (
    <Box display="flex" justifyContent="space-between" p={3}>
      {/* SEARCH BAR */}
      <Box >
        <IconButton onClick={clearText}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase  sx={{ ml: 2, flex: 1 }} placeholder="Search" value={q} onChange={(e)=>handleText(e)} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      
      

      {/* ICONS */}
      <Box display="flex" >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => ({
  search: state.generalReducers.search_name
})

export default connect(mapStateToProps, {searchBarAction, clearSearchBarAction})(Topbar);
