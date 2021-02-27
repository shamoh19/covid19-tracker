import React from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { Grid, Typography } from "@material-ui/core";

import SpeakerNotesTwoToneIcon from "@material-ui/icons/SpeakerNotesTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import { MenuItem } from "@material-ui/core";

const Chart = ({ data, allData, country }) => {
  const lineChart = allData.length ? (
    <Line
      data={{
        labels: allData.map(({ country }) => country),
        datasets: [
          {
            data: allData.map((data) => {
              return data.cases.total;
            }),
            label: "Infected",
            borderColor: "#DA7192",
            backgroundColor: "#FADFDF",
            fill: true,
          },
          {
            data: allData.map((data) => {
              return data.deaths.total;
            }),
            label: "Deaths",
            borderColor: "#CE5C5B",
            backgroundColor: "#FFA07A",
            fill: true,
          },
        ],
      }}
      options={{
        scales: { xAxes: [{ gridLines: { display: false } }], yAxes: [{ gridLines: { display: false } }] },
      }}
    />
  ) : null;

  const BarChart = data ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#db7093", "#91ff87", "#cd5c5c"],
            data: [allData[0].cases.total, allData[0].cases.recovered, allData[0].deaths.total],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.chartcontainer}>
      <Grid container spacing={4} direction="row" justify="center">
        <Grid item xs={12}>
          <Toolbar>
            <SpeakerNotesTwoToneIcon edge="start" className={styles.menuButton} color="inherit" aria-label="menu"></SpeakerNotesTwoToneIcon>
            <MenuItem>
              <Typography variant="h6" className={styles.title}>
                Covid Historical Report
              </Typography>
            </MenuItem>
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
          {country ? BarChart : lineChart}
        </Grid>
      </Grid>
    </div>
  );
};
export default Chart;
