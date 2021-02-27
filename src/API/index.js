import axios from "axios";

const rapidAPI_URL = "https://covid-193.p.rapidapi.com";
const rapidheaders = {
  "x-rapidapi-host": "covid-193.p.rapidapi.com",
  "x-rapidapi-key": "b1bc19c425msh34ab224f3e310a9p1abb87jsn773653fd201f",
  "Content-Type": "application/json",
};

export const fetchCountries = async () => {
  try {
    if (localStorage.getItem("countryList")) {
      return JSON.parse(localStorage.getItem("countryList")).response;
    }
    return await axios({
      url: `${rapidAPI_URL}/countries`,
      method: "get",
      headers: rapidheaders,
    })
      .then((response) => {
        localStorage.setItem("countryList", JSON.stringify(response.data));
        return response.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return error;
  }
};

export const fetchStatistics = async (countrySelected = null) => {
  try {
    let endPoint = countrySelected === null ? `statistics` : `history?country=${countrySelected}`;
    let previousActiveValue;
    let previousCriticalValue;
    let previousRecoveredValue;
    let previousTotalValue;
    let previousDeathValue;
    let previousAllDeathData;
    let previousAllDatesData;
    return await axios({
      url: `${rapidAPI_URL}/${endPoint}`,
      method: "get",
      headers: rapidheaders,
    })
      .then((response) => {
        const outputData = response.data.response.reduce(function (previousValue, currentValue, index, orgArr) {
          if (index > 0) {
            previousActiveValue = previousValue.active;
            previousCriticalValue = previousValue.critical;
            previousRecoveredValue = previousValue.recovered;
            previousTotalValue = previousValue.total;
            previousDeathValue = previousValue.death;
            previousAllDeathData = previousValue.allDeathData;
            previousAllDatesData = previousValue.allDatesData;
          } else {
            previousActiveValue = previousValue;
            previousCriticalValue = previousValue;
            previousRecoveredValue = previousValue;
            previousTotalValue = previousValue;
            previousDeathValue = previousValue;
            previousAllDeathData = [];
            previousAllDatesData = [];
          }
          return {
            active: previousActiveValue + currentValue.cases.active,
            critical: previousCriticalValue + currentValue.cases.critical,
            recovered: previousRecoveredValue + currentValue.cases.recovered,
            total: previousTotalValue + currentValue.cases.total,
            death: previousDeathValue + currentValue.deaths.total,
            date: new Date().toDateString(),
            allDeathData: [...previousAllDeathData, currentValue.deaths.total],
            allConfirmedData: [...previousAllDeathData, currentValue.cases.total],
            allDatesData: [...previousAllDatesData, currentValue.day],
          };
        }, 0);
        let finalData = {
          recovered: outputData.recovered,
          confirmed: outputData.active,
          deaths: outputData.death,
          reportDate: outputData.date,
          allData: response.data.response,
          allDeathData: outputData.allDeathData,
          allConfirmedData: outputData.allConfirmedData,
          allDatesData: outputData.allDatesData,
        };
        return finalData;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return error;
  }
};
