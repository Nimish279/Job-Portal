
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Step, StepLabel, Stepper } from "@mui/material";
import axios from "axios";

const HiringWorkflow = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const steps = [
    "Application",
    "Resume Shortlisting",
    "Written Test",
    "HR Interview",
    "Offer"
  ];

  // Fetch workflow status from the backend
  useEffect(() => {
    axios.get("/api/hiringStatus") // Replace with your actual API endpoint
      .then(response => {
        setCompletedSteps(response.data.completedSteps); // backend should send an array of completed steps
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching hiring status:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Hiring Workflow
      </Typography>
      <Stepper activeStep={completedSteps.length - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completedSteps.includes(label)}>
            <StepLabel>
              <Typography color={completedSteps.includes(label) ? "green" : "grey"}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {loading && <Typography>Loading workflow status...</Typography>}
    </Box>
  );
};

export default HiringWorkflow;
