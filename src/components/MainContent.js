import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Cards from "./Cards/Cards";
import Chart from "./Charts/Chart";
import CountryPicker from "./CountryPicker/CountryPicker";
import MapComponent from "./Map/MapComponent";
import { fetchStatistics } from "../API";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(0),
  },
  fullWidth: {
    width: "100%",
  },
  parentContainer: {
    border: "2px solid #ccc",
    borderRadius: "15px",
  },
  listContainer: {
    textAlign: "right",
  },
}));

const MainContent = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const [value, setValue] = useState(0);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchStatistics());
    };
    fetchAPI();
  }, []);

  const handleCountryChange = async (countrySelected) => {
    const data = await fetchStatistics(countrySelected);
    setData(data);
    setCountry(countrySelected);
  };

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Report" />
          <Tab label="Map" />
        </Tabs>
        <div className={classes.listContainer}>
          <CountryPicker handleCountryChange={handleCountryChange} countrySelected={country} />
        </div>
        <TabPanel value={value} index={0}>
          {data !== null ? (
            <div className={classes.content}>
              <Cards data={data} allData={data.allData} countrySelected={country} />
              <div className={classes.parentContainer}>
                <Chart data={data} allData={data.allData} country={country} />
              </div>
            </div>
          ) : (
            <p>...Loading</p>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MapComponent countrySelected={country} />
        </TabPanel>
      </div>
    </main>
  );
};

export default MainContent;
