import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { getPageName } from "../tools/utils";

const AppTop = () => {
  const theme = useTheme();
  const location = useLocation();

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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <Link to="/favorites" style={{ color: "inherit" }}>
              <FavoriteBorderIcon />
            </Link>
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <Link
              to={location.pathname}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {getPageName(location.pathname)}
            </Link>
          </IconButton>

          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <Link to="/search" style={{ color: "inherit" }}>
              <SearchIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppTop;
