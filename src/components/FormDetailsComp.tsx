
import {
    Box,
    Typography,
    Grid, Card, CardContent,
} from "@mui/material";
import {shopDetails, FormData} from "../context/FormDataContext.tsx";

interface FormDetailsCompProps {
    formData: FormData;
    shopDetails: shopDetails
}

const FormDetailsComp = (props: FormDetailsCompProps) => {
    // Filter out empty or null values
    console.log("props in form details component are ", props.formData, " :::: shop details are :::", props.shopDetails)
    const { formData, shopDetails } = props;

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                विवरण (Read-only View)
            </Typography>

            <Grid container spacing={2}>
                {/* Shop Details Card */}
                <Grid item xs={12}>
                    <Card variant="outlined" sx={{ backgroundColor: "#e3f2fd" }}>
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                                🏪 Shop Details
                            </Typography>

                            <Grid container spacing={1}>
                                {Object.entries(shopDetails).map(([key, value]) => (
                                    <Grid item xs={6} key={key}>
                                        <Typography variant="caption" color="text.secondary">
                                            {key}
                                        </Typography>
                                        <Typography variant="body1">{value}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Form Data Card */}
                <Grid item xs={12}>
                    <Card variant="outlined" sx={{ backgroundColor: "#fff3e0" }}>
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                                📝 Form Data
                            </Typography>

                            <Grid container spacing={1}>
                                {[
                                    { label: "आवंटन माह", value: formData.aavtanMaah },
                                    { label: "दुकान संख्या", value: formData.dukaanSankhya },
                                    { label: "वित्तीय वर्ष", value: formData.vitteeyVarsh },
                                    { label: "योजना", value: formData.yojna },
                                ].map(({ label, value }) => (
                                    <Grid item xs={6} key={label}>
                                        <Typography variant="caption" color="text.secondary">
                                            {label}
                                        </Typography>
                                        <Typography variant="body1">{value}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormDetailsComp;
