import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
//   import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//   import PersonIcon from "@mui/icons-material/Person";
//   import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//   import { Logout } from "../../services/auth-service";
//   import { GetOneUser } from "../../services/users-service";
//   import { Link, useNavigate } from "react-router-dom";
//   import { useSelector } from "react-redux";
//   import isAdmin from "../../routes/validations/NavbarValidation";
//   import WbSunnyIcon from "@mui/icons-material/WbSunny";
//   import DarkModeIcon from "@mui/icons-material/DarkMode";
//   import { changeTheme } from "../../redux/themeSlice";
//   import { useDispatch } from "react-redux";
//   import { setUserRedux } from "../../redux/userSlice";

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  //const state = useSelector((state) => state.shopCart);
  //const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const themeState = useSelector((store) => store.theme);

  useEffect(() => {
    //   if (!user.user.id) {
    //     const id_user = localStorage.getItem("id_user");
    //     GetOneUser(id_user).then((resp) => {
    //       dispatch(setUserRedux(resp.response));
    //     });
    //   }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 230;

  const handleLogout = () => {
    navigate("/login");

    localStorage.removeItem("token");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Notes App
      </Typography>
      <Divider />
      <List>
        <Box>
          <Link to="/" className="linkFix">
            <ListItemButton
              sx={{ display: "flex", justifyContent: "center", gap: 1 }}
            >
              <HomeIcon sx={{ fontSize: 27 }} />
              <Typography>Home</Typography>
            </ListItemButton>
          </Link>

          <ListItemButton
            //onClick={() => //dispatch(changeTheme())}
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            {/* {themeState.isDark ? (
                <WbSunnyIcon sx={{ fontSize: 27 }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 27 }} />
              )} */}
            <Typography>Cambiar Tema</Typography>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleLogout()}
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            <ExitToAppIcon sx={{ fontSize: 27 }} />
            <Typography>Cerrar Sesion</Typography>
          </ListItemButton>
        </Box>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" className="linkFix">
              Notes App
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* Home */}
            <Link to="/" className="linkFix">
              <IconButton size="large" color="inherit">
                <HomeIcon sx={{ fontSize: 27 }} />
              </IconButton>
            </Link>
            {/* Logout */}
            <IconButton color="inherit" onClick={() => handleLogout()}>
              <ExitToAppIcon sx={{ fontSize: 27 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
