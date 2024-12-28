import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BookIcon from "@mui/icons-material/Book";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { t } from "../tools/utils";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `4px solid ${theme.palette.divider}`,
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <BottomNavigationAction
        label={t("explore")}
        icon={<TravelExploreIcon />}
        onClick={() => handleNavigation("/explore")}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiBottomNavigationAction-label": {
            color: theme.palette.primary.light,
            fontSize: "0.7rem",
            marginTop: "0.1rem",
          },
        }}
      />
      <BottomNavigationAction
        label={t("search")}
        icon={<SearchIcon />}
        onClick={() => handleNavigation("/search")}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiBottomNavigationAction-label": {
            color: theme.palette.primary.light,
            fontSize: "0.7rem",
            marginTop: "0.1rem",
          },
        }}
      />
      <BottomNavigationAction
        label={t("add-book")}
        icon={<PostAddIcon />}
        onClick={() => handleNavigation("/add-book")}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiBottomNavigationAction-label": {
            color: theme.palette.primary.light,
            fontSize: "0.7rem",
            marginTop: "0.1rem",
          },
        }}
      />
      <BottomNavigationAction
        label={t("my-books")}
        icon={<BookIcon />}
        onClick={() => handleNavigation("/my-books")}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiBottomNavigationAction-label": {
            color: theme.palette.primary.light,
            fontSize: "0.7rem",
            marginTop: "0.1rem",
          },
        }}
      />
      <BottomNavigationAction
        label={t("profile")}
        icon={<AccountCircleIcon />}
        onClick={() => handleNavigation("/profile")}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiBottomNavigationAction-label": {
            color: theme.palette.primary.light,
            fontSize: "0.7rem",
            marginTop: "0.1rem",
          },
        }}
      />
    </BottomNavigation>
  );
};

export default Footer;
