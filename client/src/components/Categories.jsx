import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const Categories = ({ categories }) => {
  const theme = useTheme();

  return (
    <Container>
      <Box
        display="flex"
        overflow="auto"
        sx={{ padding: "1rem 0", gap: "1rem" }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: `1px solid ${theme.palette.primary.dark}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">{category.icon}</Typography>
            </Box>
            <Typography variant="caption" color={theme.palette.text.secondary}>
              {category.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Categories;
