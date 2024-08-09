import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import { LineGr } from "./Line";
import Cards from "./Cards";
import TempCards from "./Temperature-Card";
import CssBaseline from "@mui/material/CssBaseline";
import OutlinedCard from "./Outlinecard";
import { Line } from "react-chartjs-2";
export default function FullBorderedGrid() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >
        {[...Array(3)].map((_, index) => (
          <Grid
            key={index}
            {...{ xs: 12, sm: 8, md: 4, lg: 3 }}
            minHeight={160}
          >
            {index === 0 && <LineGr />} {}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
