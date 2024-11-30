import { Box, Container, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Container>
      <Box display="flex" alignItems="center" style={{ marginBottom: "1rem" }}>
        <TextField
          label="חיפוש בספרים שלי"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={onSearchChange}
        />
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  searchQuery: "",
};

export default SearchBar;
