import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl, Grid, Typography } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import { fetchCountries } from "../../API";

import Toolbar from "@material-ui/core/Toolbar";
import { MenuItem } from "@material-ui/core";

const CountryPicker = ({ handleCountryChange, countrySelected }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    if (fetchedCountries.length === 0) {
      const fetchAPI = async () => {
        await fetchCountries().then((res) => {
          setFetchedCountries(res);
        });
      };
      fetchAPI();
    }
  }, [fetchedCountries]);

  return (
    <div>
      <Grid container spacing={0} direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={6}>
          <Toolbar>
            <PublicRoundedIcon edge="start" className={styles.menuButton} color="inherit" aria-label="menu"></PublicRoundedIcon>
            <MenuItem>
              <Typography variant="h6" className={styles.title}>
                Choose the Country
              </Typography>
            </MenuItem>
          </Toolbar>

          {/* <PublicRoundedIcon edge="start" color="inherit" aria-label="menu"></PublicRoundedIcon>
          <Typography variant="h6">Latest information on Coronavirus COVID-19</Typography> */}
        </Grid>
        <Grid item xs={6}>
          {fetchedCountries.length > 0 ? (
            <FormControl className={styles.formControl}>
              <NativeSelect defaultValue={countrySelected} onChange={(e) => handleCountryChange(e.target.value)} variant="filled">
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default CountryPicker;
