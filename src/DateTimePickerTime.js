import React, { Component, PropTypes } from "react";
import { Glyphicon } from "react-bootstrap";
import DateTimePickerMinutes from "./DateTimePickerMinutes";
import DateTimePickerHours from "./DateTimePickerHours";
import Constants from "./Constants.js";

export default class DateTimePickerTime extends Component {
  static propTypes = {
    setSelectedHour: PropTypes.func.isRequired,
    setSelectedMinute: PropTypes.func.isRequired,
    subtractHour: PropTypes.func.isRequired,
    addHour: PropTypes.func.isRequired,
    subtractMinute: PropTypes.func.isRequired,
    addMinute: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    togglePeriod: PropTypes.func.isRequired,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    timeMode: PropTypes.oneOf([Constants.MODE_24H, Constants.AMPM]),
  }

  state = {
    minutesDisplayed: false,
    hoursDisplayed: false
  }

  goBack = () => {
    return this.setState({
      minutesDisplayed: false,
      hoursDisplayed: false
    });
  }

  showMinutes = () => {
    return this.setState({
      minutesDisplayed: true
    });
  }

  showHours = () => {
    return this.setState({
      hoursDisplayed: true
    });
  }

  renderMinutes = () => {
    if (this.state.minutesDisplayed) {
      return <DateTimePickerMinutes {...this.props} onSwitch={this.goBack} />;
    } else {
      return null;
    }
  }

  renderHours = () => {
    if (this.state.hoursDisplayed) {
      return <DateTimePickerHours {...this.props} onSwitch={this.goBack} />;
    } else {
      return null;
    }
  }

  renderPicker = () => {
    let hourFormat = (this.props.timeMode === Constants.MODE_24H) ? 'HH' : 'h';
    if (!this.state.minutesDisplayed && !this.state.hoursDisplayed) {
      return (
      <div className="timepicker-picker">
        <table className="table-condensed">
          <tbody>
            <tr>
              <td><a className="btn" onClick={this.props.addHour}><Glyphicon glyph="chevron-up" /></a></td>

              <td className="separator"></td>

              <td><a className="btn" onClick={this.props.addMinute}><Glyphicon glyph="chevron-up" /></a></td>

              <td className="separator"></td>
            </tr>

            <tr>
              <td><span className="timepicker-hour" onClick={this.showHours}>{this.props.selectedDate.format(hourFormat)}</span></td>

              <td className="separator">:</td>

              <td><span className="timepicker-minute" onClick={this.showMinutes}>{this.props.selectedDate.format("mm")}</span></td>

              <td className="separator"></td>

              <td>{this.props.timeMode === Constants.MODE_AMPM && <button className="btn btn-primary" onClick={this.props.togglePeriod} type="button">{this.props.selectedDate.format("A")}</button>}</td>
            </tr>

            <tr>
              <td><a className="btn" onClick={this.props.subtractHour}><Glyphicon glyph="chevron-down" /></a></td>

              <td className="separator"></td>

              <td><a className="btn" onClick={this.props.subtractMinute}><Glyphicon glyph="chevron-down" /></a></td>

              <td className="separator"></td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
        <div className="timepicker">
          {this.renderPicker()}

          {this.renderHours()}

          {this.renderMinutes()}
        </div>
    );
  }
}

module.exports = DateTimePickerTime;
