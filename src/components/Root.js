import React from 'react'

import ToolBar from './ToolBar';
import Editor from './Editor';
import Page from './Page';
import Tab from './Tab';
import StepField from './StepField';
import Diagram from './Diagram';
import StatusPanel from './StatusPanel';
import HistoryPanel from './HistoryPanel';
import ToolTip from './ToolTip';
import SplitPane from './SplitPane';

class Root extends React.Component {
    render(){
        return (<div id="wrapper">
            <header><ToolBar /></header>
            <section id="panel-wrapper">
            <SplitPane split="vertical" className="root-panel" primary="second" defaultSize={400}>
                <SplitPane split="horizontal" className="editor-panel" defaultSize="70%">
                    <Editor />
                    <Tab className="debug-panel">
                        <Page label="Step"><StepField /></Page>
                        <Page label="Auto">not implemented</Page>
                    </Tab>
                </SplitPane>
                <SplitPane split="horizontal" className="vis-panel" defaultSize={500}>
                    <Diagram />
                    <Tab className="inspector">
                        <Page label="Status"><StatusPanel /></Page>
                        <Page label="History"><HistoryPanel /></Page>
                    </Tab>
                </SplitPane>
            </SplitPane>
            </section>
            <ToolTip />
        </div>);
    }
}

export default Root;