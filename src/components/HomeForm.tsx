import { useState} from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useFormData} from "../context/FormDataContext.tsx";
import axios from "axios";


function HomeForm() {

    const navigate = useNavigate();

    const [shopDetails, setShopDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(true);

    const getShopDetails = async (shopNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://e-chalan-download-service-production.up.railway.app/shops/shopDetail/${shopNumber}`
            );
            console.log("response data are :: ",response.data);
            setShopDetails(response.data);
            setSubmitEnabled(false);
            setFormData((prev) => ({
                ...prev,
                ["quantity"]: Number(response.data.cardCount),
            }));
        } catch (error) {
            console.error("Error fetching shop details:", error);
            setShopDetails(null);
        } finally {
            setLoading(false);
        }
    };

    const { updateFormData } = useFormData();

    const [formData, setFormData] = useState({
        yojna: "NFSA(Wheat&Rice)",
        vitteeyVarsh: "2025-26",
        aavtanMaah: "मई",
        dukaanSankhya: "",
        captcha: "",
        quantity: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the form data as JSON
        console.log("Submitted Form Data:", JSON.stringify(formData, null, 2));

        updateFormData(formData);

        navigate('/details')
        // Optionally, you could perform other actions here
    };
  return (
      <>
          <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                  maxWidth: 600,
                  mx: "auto",
                  p: 3,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#fff",
              }}
          >
              <Typography variant="h6" align="center" mb={2}>
                  ई-चालान डाउनलोड
              </Typography>

              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                          <InputLabel>योजना</InputLabel>
                          <Select
                              name="yojna"
                              value={formData.yojna}
                              label="योजना"
                              onChange={handleChange}
                          >
                              <MenuItem value="NFSA(Wheat&Rice)">
                                  NFSA(Wheat&Rice)
                              </MenuItem>
                              <MenuItem value="OtherScheme">OtherScheme</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                          <InputLabel>वित्तीय वर्ष</InputLabel>
                          <Select
                              name="vitteeyVarsh"
                              value={formData.vitteeyVarsh}
                              label="वित्तीय वर्ष"
                              onChange={handleChange}
                          >
                              <MenuItem value="2025-26">2025-26</MenuItem>
                              <MenuItem value="2024-25">2024-25</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                          <InputLabel>आवंटन माह</InputLabel>
                          <Select
                              name="aavtanMaah"
                              value={formData.aavtanMaah}
                              label="आवंटन माह"
                              onChange={handleChange}
                          >
                              <MenuItem value="मई">मई</MenuItem>
                              <MenuItem value="जून">जून</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField
                          name="dukaanSankhya"
                          label="दुकान संख्या"
                          value={formData.dukaanSankhya}
                          onChange={handleChange}
                          fullWidth
                          required
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Button
                          onClick={()=>{
                                    getShopDetails("20551107").then(r => console.log(r));
                          }}
                          type="button"
                          variant="contained"
                          color="error"
                          fullWidth
                          sx={{ mt: 2 }}
                      >
                          Get Shop Details
                      </Button>
                  </Grid>

                  <Grid item xs={12}>
                      <Button
                          disabled={submitEnabled}
                          type="submit"
                          variant="contained"
                          color="error"
                          fullWidth
                          sx={{ mt: 2 }}
                      >
                          चालान हेतु प्राप्त करें
                      </Button>
                  </Grid>
                  <Grid item xs={12}>
                      {loading && (
                          <Typography variant="body1" sx={{ mt: 2 }}>
                              Loading...
                          </Typography>
                      )}
                      {!loading && shopDetails === null && (
                          <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
                              20551107 number shop not found
                          </Typography>
                      )}

                      {!loading && shopDetails && (
                          <Paper
                              elevation={3}
                              sx={{
                                  mt: 2,
                                  p: 2,
                                  backgroundColor: "#f5f5f5",
                              }}
                          >
                              <Typography variant="h6" gutterBottom>
                                  Shop Details
                              </Typography>

                              {[
                                  { key: "district", label: "District" },
                                  { key: "block", label: "Block" },
                                  { key: "gramPanchayat", label: "Gram Panchayat" },
                                  { key: "shopkeeperName", label: "Shopkeeper Name" },
                                  { key: "shopNumber", label: "Shop Number" },
                                  { key: "cardType", label: "Card Type" },
                                  { key: "cardCount", label: "Card Count" },
                              ].map(({ key, label }) => (
                                  <Box key={key} sx={{ mb: 1 }}>
                                      <Typography variant="caption" color="text.secondary">
                                          {label}
                                      </Typography>
                                      <Typography variant="body1">
                                          {shopDetails[key]?.toString() || "-"}
                                      </Typography>
                                  </Box>
                              ))}
                          </Paper>
                      )}

                  </Grid>
              </Grid>

          </Box>
      </>
  )
}

export default HomeForm;