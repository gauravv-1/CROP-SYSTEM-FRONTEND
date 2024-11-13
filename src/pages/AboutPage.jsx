import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Container,
} from '@mui/material';
import { styled } from '@mui/system';
import m1 from '../assests/m1.jpg';
import m2 from '../assests/m2.png';
import m3 from '../assests/m3.png';
import tm1 from '../assests/image.png';

// Styled components
const PageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f9fbfd',
  fontFamily: 'Arial, sans-serif',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#2c3e50',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#34495e',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
}));

const Section = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    width: 100,
    height: 100,
  },
}));

const ImageGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const teamMembers = [
  { name: 'Pranav Shinde', id: '72289190D', image: 'path/to/pranav.jpg' },
  { name: 'Shwetabh Singh', id: '72289199H', image: 'path/to/shwetabh.jpg' },
  { name: 'Gaurav Pisal', id: '72289116E', image: tm1 },
  { name: 'Rahul Sonar', id: '72289205F', image: 'path/to/rahul.jpg' },
];

// Image data for methodology section
const methodologyImages = [m1, m2, m3, m3];

const AboutPage = () => (
  <PageContainer>
    <Title variant="h3">Soil Nutrient Data Acquisition Using NPK Sensor</Title>
    <Subtitle variant="h5">
      A Fourth-Year Major Project for Electronics & Telecommunication
    </Subtitle>

    {/* Project Information */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">
          Project Overview
        </Typography>
        <Typography paragraph>
          This project aims to monitor soil parameters such as humidity,
          temperature, pH, and nutrient levels in real-time. Utilizing IoT
          technology, it provides actionable data for farmers to make informed
          decisions for enhanced crop yield and sustainability.
        </Typography>
      </CardContent>
    </Section>

    {/* Methodology */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">
          Methodology
        </Typography>

        <Typography variant="subtitle1" color="secondary" gutterBottom>
          Study Existing Systems
        </Typography>
        <Typography paragraph>
          Research current soil mapping technologies, study NPK detection
          tools, and assess remote sensing options.
        </Typography>

        <Typography variant="subtitle1" color="secondary" gutterBottom>
          Hardware Setup
        </Typography>
        <Typography paragraph>
          Configure sensors and microcontroller NodeMcu
          ESP8266 for data acquisition and transmission.
        </Typography>

        <Typography variant="subtitle1" color="secondary" gutterBottom>
          Working Mechanism
        </Typography>
        <Typography paragraph>
          Sensors capture soil data at intervals and transmit it wirelessly to
          the cloud for analysis and visualization.
        </Typography>

        {/* Image Grid */}
        <ImageGridContainer container spacing={2}>
          {methodologyImages.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <img src={img} alt={`Methodology ${idx + 1}`} />
            </Grid>
          ))}
        </ImageGridContainer>
      </CardContent>
    </Section>

    {/* Advantages */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">
          Advantages
        </Typography>
        <ul>
          <li>Real-time monitoring of soil nutrients and pH levels.</li>
          <li>Data-informed decisions and precision agriculture.</li>
          <li>Remote monitoring from any location.</li>
          <li>Automation for efficient resource usage.</li>
        </ul>
      </CardContent>
    </Section>

    {/* Applications */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">
          Applications
        </Typography>
        <ul>
          <li>Precision agriculture for efficient fertilization.</li>
          <li>Real-time soil data visualization for informed actions.</li>
          <li>Historical data analysis to improve crop planning.</li>
        </ul>
      </CardContent>
    </Section>

    {/* Team Members */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">
          Team Members
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item xs={6} sm={6} md={3} key={member.id}>
              <TeamAvatar src={member.image} alt={member.name} />
              <Typography variant="subtitle1" align="center">
                {member.name}
              </Typography>
              <Typography variant="subtitle2" align="center">
                {member.id}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Section>
    {/* Project Guide */}
    <Section>
      <CardContent>
        <Typography variant="h6" color="primary">Project Guide</Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <TeamAvatar src="path/to/guide-photo.jpg" alt="Prof. Varsha Patil" />
            <Typography variant="subtitle1" align="center">Prof. Varsha Patil</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Section>
  </PageContainer>
);

export default AboutPage;
