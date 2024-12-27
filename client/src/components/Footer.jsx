import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BookIcon from "@mui/icons-material/Book";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useTheme } from "@mui/material/styles";
import { t } from "../tools/utils";

const Footer = () => {
  const theme = useTheme();

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
        label={t("add book")}
        icon={<PostAddIcon />}
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
        label={t("my books")}
        icon={<BookIcon />}
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
