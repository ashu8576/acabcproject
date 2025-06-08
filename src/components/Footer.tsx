import { Box, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, IconButton, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box
            id={"footerContactUs"}
            component="footer"
            sx={{
                backgroundColor: '#1f1f1f',
                color: '#fff',
                p: { xs: 4, md: 6 },
            }}
        >
            <Grid container spacing={4}>
                {/* NEWSLETTER */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>
                        NEWSLETTER
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: '#788a0d',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                        </svg>
                    </Box>
                </Grid>

                {/* EXPLORE */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>
                        EXPLORE
                    </Typography>
                    <List>
                        {['Home', 'About', 'Service', 'Projects', 'Testimonail', 'Contact us'].map((text) => (
                            <ListItem key={text} disableGutters>
                                <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {/* RECENT POSTS */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>
                        RECENT POSTS
                    </Typography>
                    {[1, 2].map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                                component="img"
                                src="https://html.design/demo/agropro/images/resent.jpg"
                                alt="Recent post"
                                sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
                            />
                            <Typography variant="body2">
                                ea commodo <br /> consequat. Duis aute
                            </Typography>
                        </Box>
                    ))}
                </Grid>

                {/* CONTACT */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>
                        CONTACT
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                            <PhoneIcon sx={{ color: '#788a0d' }} />
                        </ListItemIcon>
                        <Typography variant="body2">+01 1234567892</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                            <EmailIcon sx={{ color: '#788a0d' }} />
                        </ListItemIcon>
                        <Typography variant="body2">demo@gmail.com</Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Bottom bar */}
            <Box
                sx={{
                    backgroundColor: '#788a0d',
                    mt: 4,
                    p: 2,
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <Typography variant="body2" sx={{ mb: 1 }}>
                    © 2022 All Rights Reserved. Design by Free html Templates
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton sx={{ color: '#fff' }}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <TwitterIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
