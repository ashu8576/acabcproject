
import {
    Box,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

const FormDetailsComp = ({ data }) => {
    // Filter out empty or null values
    const entries = Object.entries(data).filter(([_, value]) =>
        value !== "" && value !== null && value !== 0
    );

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                विवरण (Read-only View)
            </Typography>

            <Grid container spacing={2}>
                {entries.map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 1,
                                bgcolor: "#f9f9f9",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontWeight: "bold" }}
                            >
                                {key}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {value ? value.toString() : ""}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FormDetailsComp;
