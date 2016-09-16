import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import CandidateMessage from './CandidateMessage';
import ElementArranger from './ElementArranger';

const MessageList = ({ timeInterval, margin, messageLog, messageQueue, width, actorNum, messageFlag }) => {
  return <ElementArranger>{
    messageLog
      .concat(messageQueue.map((m, i) => ({ ...m, candidate: true })))
      .map((msg, index) => {
        var xSpan = width / actorNum;
        var props = {
          id: msg.uid,
          key: msg.uid,
          text: JSON.stringify(msg.data),
          fromX: xSpan * msg.from,
          fromY: msg.timestamp * timeInterval + margin,
          toX: xSpan * msg.to,
          toY: msg.candidate ? (messageLog.length + 1) * timeInterval + margin
            : (index + 1) * timeInterval + margin,
          className: [msg.candidate ? 'candidate' : 'log', 
                      messageFlag ? '' : 'hide-message',
                      msg.discard ? 'discard' : '' ].join(' '),
        };
        if (msg.candidate)
          return <CandidateMessage {...props} />;
        else
          return <Message {...props} />;
      })
  }</ElementArranger>;
}
function mapStateToProps(state) {
  return {
    actorNum: state.vm.actors.length,
    messageLog: state.vm.messageLog,
    messageQueue: state.vm.messageQueue,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
    messageFlag: state.diagram.showMessage,
  };
}

export default connect(mapStateToProps)(MessageList);