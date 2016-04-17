import React from 'react';

export function IdleSpinner(props) {
  if(props.workerData.activityName === 'Idle') {
    return(
      <div className='text-center'>
        <h2>Waiting for Tasks</h2>
        <i className='fa fa-spinner fa-pulse fa-5x'></i>
      </div>
    );
  } else {
    return(null);
  }
}
