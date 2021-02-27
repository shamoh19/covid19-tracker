import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class CheckBoxSelector extends React.Component {
  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={this.props.infectedOn} onChange={this.props.toggleInfectedData} className="checkedA" style={{ color: "#db7093" }} />}
          label="Infected"
        />
        <FormControlLabel
          control={<Checkbox checked={this.props.recoveredOn} onChange={this.props.toggleRecoveredData} className="checkedB" style={{ color: "#91ff87" }} />}
          label="Recovered"
        />
        <FormControlLabel
          control={<Checkbox checked={this.props.deathOn} onChange={this.props.toggleDeathData} name="checkedC" style={{ color: "#cd5c5c" }} />}
          label="Dead"
        />
      </FormGroup>
    );
  }
}
