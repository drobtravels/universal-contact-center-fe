import React, { Component } from 'react';

class ReservationPresenter extends Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
    sid: React.PropTypes.string.isRequired,
    onAccept: React.PropTypes.func.isRequired,
    onReject: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <div>
        <strong>New Reservation</strong>
        <p>
          { this.props.task.attributes.type + ' from ' + this.props.task.attributes.name }
        </p>
        <button onClick={this.props.onAccept}>Accept</button>
        <button onClick={this.props.onReject}>Reject</button>
      </div>
    );
  }
}

export class ReservationHandler extends Component {
  static propTypes = {
    workerAPI: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var worker = this.props.workerAPI;
    worker.on('reservation.created', (reservation) => {
      this.setState({ reservation: reservation })
    });
    worker.on('reservation.rejected', () => console.log('reservation rejected'));
    worker.on('reservation.timeout', this.clearReservation);
    worker.on('reservation.rejected', this.clearReservation);
    worker.on('reservation.canceled', this.clearReservation);
    worker.on('reservation.rescinded', this.clearReservation);
  }

  clearReservation = (reservation) => {
    if(this.state.reservation && this.state.reservation.sid === reservation.sid) {
      this.setState({ reservation: null });
    }
  }

  onAccept = () => {
    console.log('accepting current reservation');
    this.clearReservation(this.state.reservation);
    this.state.reservation.accept( (error, reservation) => {
      if (error) {
        console.error(error);
      }
    });
  }

  onReject = () => {
    console.log('rejecting current reservation');
    this.state.reservation.reject();
    this.clearReservation(this.state.reservation)
  }

  render() {
    if(this.state.reservation) {
      return(
        <ReservationPresenter {...this.state.reservation} onAccept={this.onAccept} onReject={this.onReject}/>
      );
    } else {
      return(<div />);
    }
  }


}
