import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { GitHub, Instagram, LinkedIn, ExpandMore } from '@mui/icons-material/'
import { grey, lightBlue } from '@mui/material/colors';


function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
            bgcolor: grey[100]
          }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"

        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Infrastructure Engineer
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>ClearStreet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Info about ClearStreet
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{
            bgcolor: grey[100]
          }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Software Engineer Intern</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            BorgIQ
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Worked on RPI process automation
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{
            bgcolor: grey[100]
          }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Software Engineer Intern
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Ark Paradigm
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Work at Ark
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{
            bgcolor: grey[100]
          }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Software Developer Intern</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Ministry of Government and Consumer Services 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default function BasicCard() {
  return (
    <Card sx={{ 
        maxWidth: 396,
        minWidth: 396,
        maxHeight: 564,
        minHeight: 564,
        border: 1,
        borderColor: "#fff",
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom: 5,
        paddingLeft: 7,
        bgcolor: grey[100] }}>
      <CardContent>

        {/* Logo */}
        {/* Name */}


        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Vishesh Gupta Logo
        </Typography>
        <Typography variant="h5" component="div">
          Vishesh Gupta
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* DK what to put here */}
        </Typography>
        <Typography variant="body2">
          {/* DK what to put here */}
          <br />
          <Chip variant="outlined" label="Computer Science // University of Waterloo" color="warning" avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png" />} />
          <ControlledAccordions />
        </Typography>
      </CardContent>
      <Button variant="contained" color="success" size="small" startIcon={<GitHub />} sx={{ 
        backgroundColor: grey[900]
       }}>GitHub</Button>
      <Button variant="contained" color="success" size="small" startIcon={<Instagram />}>Instagram</Button>
      <Button variant="contained" color="success" size="small" startIcon={<LinkedIn />} sx={{
        backgroundColor: lightBlue[700],
      }}>Linkedin</Button>
    </Card>
  );
}