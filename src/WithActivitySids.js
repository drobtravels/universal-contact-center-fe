import React, { Component } from 'React';

export var WithActivitySids = ComposedComponent => class extends Component {
  static displayName = 'WithActivitySidsWrapper'

  static propTypes = {
    workerAPI: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { activitySids: null }
  }

  componentWillMount() {
    this.props.workerAPI.activities.fetch( (error, activities) => {
      if(error) {
        console.log(err);
      }
      else {
        this.setState({ activitySids: activities.data.reduce((sids, activity) => {
            sids[activity.friendlyName] = activity.sid
            return(sids)
          }, {})
        });
      }
    })
  }

  render() {
    if(this.state.activitySids) {
      return(
        <ComposedComponent {...this.props} activitySids={this.state.activitySids} />
      )
    } else {
      return ( <span>... </span> );
    }

  }
}
