import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
      <Box sx={{ position: 'relative', height: { xs: '100vh', md: '70vh' }, overflow: 'hidden' }}>
        {/* Background Image */}
        <Box
            component="img"
            src="https://html.design/demo/agropro/images/banner.jpg"
            alt="Farm Background"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
        />

        {/* Overlay */}
        <AppBar position="absolute" sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: '#788a0d', fontWeight: 'bold' }}>
              AGROPRO
            </Typography>

            {isMobile ? (
                <IconButton>
                  <MenuIcon/>
                </IconButton>
            ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {['Home', 'Service', 'Contact'].map((item) => (
                      <Button
                          onClick={()=>{
                              if(item === "Service") {
                                  const formElement = document.getElementById('homeFormComp');
                                  if (formElement) {
                                      formElement.scrollIntoView({behavior: 'smooth'});
                                  }
                              }
                              if(item === "Contact") {
                                  const formElement = document.getElementById('footerContactUs');
                                  if (formElement) {
                                      formElement.scrollIntoView({behavior: 'smooth'});
                                  }
                              }
                          }}
                          key={item}
                          sx={{ color: item === 'Home' ? '#788a0d' : '#000', fontWeight: item === 'Home' ? 'bold' : 'normal' }}
                      >
                        {item}
                      </Button>
                  ))}
                  <Button sx={{ color: '#788a0d', fontWeight: 'bold' }}>LOGIN</Button>
                  <IconButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M15.5,14h-.79l-.28-.27A6.471,6.471,0,0,0,16,9.5,6.5,6.5,0,1,0,9.5,16a6.471,6.471,0,0,0,4.23-1.57l.27.28v.79l5,4.99L20.49,19ZM9.5,14A4.5,4.5,0,1,1,14,9.5,4.5,4.5,0,0,1,9.5,14Z" />
                    </svg>
                  </IconButton>
                </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Header;
