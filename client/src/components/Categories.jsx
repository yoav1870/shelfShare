import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Categories = ({ categories, onCategorySelect, selectedCategory }) => {
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
            onClick={() => onCategorySelect(category.value)}
            sx={{ cursor: "pointer" }}
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
                backgroundColor:
                  selectedCategory === category.value
                    ? theme.palette.primary.light
                    : "transparent",
              }}
            >
              <Typography variant="h5">{category.icon}</Typography>
            </Box>
            <Typography
              variant="caption"
              color={theme.palette.text.secondary}
              sx={{
                textAlign: "center",
                whiteSpace: "normal",
              }}
            >
              {category.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Categories;
