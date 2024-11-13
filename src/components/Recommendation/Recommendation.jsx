import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemIcon, useMediaQuery } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import { useTheme } from '@mui/material/styles';
import { npkValues, cropRecommendations } from '../../data/npkData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Recommendation = ({ selectedDistrict }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!selectedDistrict) {
        return <Typography variant="h6" align="center">Please select a district on the dashboard.</Typography>;
    }

    const npk = npkValues[selectedDistrict];
    if (!npk) {
        return <Typography variant="h6" align="center">No data available for the selected district.</Typography>;
    }

    const recommendedCrops = cropRecommendations(npk.N, npk.P, npk.K);

    const data = {
        labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)'],
        datasets: [{ label: 'NPK Values', data: [npk.N, npk.P, npk.K], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `NPK Values for ${selectedDistrict}` },
        },
        maintainAspectRatio: false,
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            sx={{
                padding: isSmallScreen ? 2 : 4,
                bgcolor: '#f5f5f5',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                color="primary"
                fontFamily="'Roboto', sans-serif"
                sx={{
                    fontSize: isSmallScreen ? '1.5rem' : '2rem',
                    textAlign: 'center',
                }}
            >
                Fertilizer Recommendation System
            </Typography>
            <Typography
                variant="h6"
                color="textSecondary"
                fontFamily="'Roboto', sans-serif"
                sx={{
                    fontSize: isSmallScreen ? '1rem' : '1.25rem',
                    textAlign: 'center',
                }}
            >
                Region: {selectedDistrict}
            </Typography>
            <Box
                display="flex"
                flexDirection={isSmallScreen ? "column" : "row"}
                justifyContent="center"
                width="100%"
                maxWidth="1200px"
                marginTop={4}
            >
                <Card sx={{ width: isSmallScreen ? '100%' : '60%', marginBottom: isSmallScreen ? 2 : 0, marginRight: isSmallScreen ? 0 : 2 }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>NPK Levels</Typography>
                        <Divider />
                        <Box height={isSmallScreen ? "250px" : "400px"}>
                            <Bar data={data} options={options} />
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ width: isSmallScreen ? '100%' : '40%' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>NPK Values</Typography>
                        <Divider />
                        <Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon><AgricultureIcon color="primary" /></ListItemIcon>
                                    <Typography variant="body1" fontFamily="'Roboto', sans-serif">Nitrogen (N): <strong>{npk.N}</strong></Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><GrassIcon color="secondary" /></ListItemIcon>
                                    <Typography variant="body1" fontFamily="'Roboto', sans-serif">Phosphorus (P): <strong>{npk.P}</strong></Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><SpaIcon color="success" /></ListItemIcon>
                                    <Typography variant="body1" fontFamily="'Roboto', sans-serif">Potassium (K): <strong>{npk.K}</strong></Typography>
                                </ListItem>
                            </List>
                        </Box>
                        <Typography variant="h6" gutterBottom>Recommended Crops</Typography>
                        <Divider />
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" marginTop={2}>
                            {recommendedCrops.map((crop, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        margin: '5px',
                                        cursor: 'pointer',
                                        flex: '1 1 45%',
                                        textAlign: 'center',
                                        '&:hover': {
                                            backgroundColor: '#115293',
                                        },
                                    }}
                                >
                                    <Typography variant="body1" fontFamily="'Roboto', sans-serif">{crop}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Recommendation;
