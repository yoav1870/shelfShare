import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";

const AppTop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          marginBottom: "1rem",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ color: theme.palette.primary.contrastText }}
            aria-label="menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: theme.palette.primary.contrastText }}
          >
            ShelfShare
          </Typography>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List
          sx={{
            width: 250,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <ListItem button>
            <ListItemText primary="Option 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Option 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Option 3" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AppTop;
