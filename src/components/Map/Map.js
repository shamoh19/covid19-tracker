import React from "react";

import { MapContainer, Circle, TileLayer } from "react-leaflet";

export default class Leaflet extends React.Component {
  render() {
    const position = [35, -40];
    const zoom = 2;
    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} attribution={""} />
        {this.props.infectedOn && <MyCircles data={this.props.infectedData} date={this.props.date} color="#db7093" />}
        {this.props.recoveredOn && <MyCircles data={this.props.recoveredData} date={this.props.date} color="#91ff87" />}
        {this.props.deathOn && <MyCircles data={this.props.deathData} date={this.props.date} color="#cd5c5c" />}
      </MapContainer>
    );
  }
}

const MyCircles = (props) => {
  return props.data.map((row, i) => {
    if (row[props.date] <= 0) {
      return;
    }
    if (row["Lat"] != null && row["Long"] != null) {
      return (
        <Circle
          key={i}
          center={[row["Lat"], row["Long"]]}
          radius={1000 * Math.sqrt(row[props.date])}
          fillOpacity={0.5}
          fillColor={props.color}
          stroke={false}
        />
      );
    }
  });
};
