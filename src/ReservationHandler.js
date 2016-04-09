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
          { this.props.task.attributes.type + 'from' + this.props.task.attributes.name }
        </p>
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

    worker.on('reservation.accepted', () => console.log('reservation accepted'));
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

  }

  onReject = () => {

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
