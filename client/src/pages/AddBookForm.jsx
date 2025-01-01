import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { t } from "../tools/utils";
import CustomAlert from "../components/CustomAlert";

const AddBookForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    state: "",
    pics: [],
    location: "",
    author: "",
    genre: "",
    tags: "",
    more: "",
    cityOptions: [],
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.pics.length > 3) {
      setAlert({ open: true, message: t("max-pics-error"), severity: "error" });
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          pics: [...prevData.pics, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePic = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      pics: prevData.pics.filter((_, i) => i !== index),
    }));
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
              },
            }
          );
          const city =
            response.data.address.city ||
            response.data.address.town ||
            response.data.address.village;
          setFormData({
            ...formData,
            location: city,
          });
        } catch (error) {
          setAlert({
            open: true,
            message: t("location-error"),
            severity: "error",
          });

          console.error("Error fetching location details:", error);
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // setFormData({
    //   title: "",
    //   state: "",
    //   pics: [],
    //   location: "",
    //   author: "",
    //   genre: "",
    //   tags: "",
    //   more: "",
    //   cityOptions: [],
    // });
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        direction: "rtl",
      }}
    >
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ open: false, message: "", severity: "" })}
      />

      <TextField
        label={t("title")}
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>{t("state")}</InputLabel>
        <Select name="state" value={formData.state} onChange={handleChange}>
          <MenuItem value="new">{t("new")}</MenuItem>
          <MenuItem value="used">{t("used")}</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "start",
          mt: 2,
          mb: 2,
          p: 2,
          border: `1px dashed ${theme.palette.primary.main}`,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            {t("upload-picture")}
          </Typography>
          <IconButton
            color="primary"
            aria-label={t("upload-picture")}
            component="label"
          >
            <input
              hidden
              accept="image/jpeg,image/png"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <PhotoCamera />
          </IconButton>
        </Box>
        {formData.pics.length > 0 && (
          <Box mt={2} sx={{ display: "flex", gap: 1 }}>
            {formData.pics.map((pic, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={pic}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "4px",
                  }}
                />
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  color="secondary"
                  onClick={() => handleDeletePic(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, direction: "rtl" }}
      >
        <TextField
          label={t("location-to-pick-up")}
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="outlined" onClick={handleLocationClick}>
          {t("use-my-location")}
        </Button>
      </Box>
      <TextField
        label={t("author")}
        name="author"
        value={formData.author}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t("genre")}
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t("tags")}
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t("more-information")}
        name="more"
        value={formData.more}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box textAlign="center" mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {t("submit")}
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookForm;
