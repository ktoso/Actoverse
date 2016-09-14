// This is the Container. Move this later.

import Message from './Message';
import { connect } from 'react-redux';

import { stepActor } from '../../actions/vm';
import { scrollTo } from '../../actions/diagram';

function mapStateToProps(state) {
    return { 
        actors: state.vm.actors,
        messageQueue: state.vm.messageQueue,
        height: state.panels['vis-panel']
    };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClickDispatch: (actors, msg, height) => {
      var target = actors[msg.to];
      dispatch(stepActor(ownProps.index));
      target[target._state](...msg.data);
      dispatch(scrollTo(ownProps.toY));
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    onClick: () => dispatchProps.onClickDispatch(
      stateProps.actors,
      stateProps.messageQueue[ownProps.index],
      stateProps.height
    )
  })
}

const CandidateMessage = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Message);

export default CandidateMessage;