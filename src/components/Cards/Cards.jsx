import React from "react";
import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({ data: { confirmed, recovered, deaths, reportDate }, allData, countrySelected }) => {
  if (!confirmed) {
    return "Please wait..";
  }

  return (
    <div className={styles.cardscontainer}>
      <Grid container spacing={4} justify="center">
        <Typography className={styles.headerpadding} variant="h6">
          Latest information on Coronavirus COVID-19 for {countrySelected === "" ? "the entire Global" : countrySelected}
        </Typography>
      </Grid>
      <Grid container spacing={4} justify="space-evenly">
        <Grid style={{ backgroundColor: "rgba(245, 192, 192, 0.5)" }} item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countrySelected === "" ? confirmed : allData[0].cases.total} duration={3} separator="," />
            </Typography>
            <Typography color="textSecondary">{reportDate}</Typography>
            <Typography variant="body2">Number of active cases of Covid-19</Typography>
          </CardContent>
        </Grid>

        <Grid style={{ backgroundColor: "#DDFEDD" }} item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countrySelected === "" ? recovered : allData[0].cases.recovered} duration={3} separator="," />
            </Typography>
            <Typography color="textSecondary">{reportDate}</Typography>
            <Typography variant="body2">Number of recoveries from Covid-19</Typography>
          </CardContent>
        </Grid>

        <Grid style={{ backgroundColor: "#FFA07A" }} item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={countrySelected === "" ? deaths : allData[0].deaths.total} duration={3} separator="," />
            </Typography>
            <Typography color="textSecondary">{reportDate}</Typography>
            <Typography variant="body2">Number of deaths caused by Covid-19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
