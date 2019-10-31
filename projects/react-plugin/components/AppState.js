import React, { Component } from "react";
import { deepCopy } from '../utils/helper.utils';

export const getInitialState = () => deepCopy({
  hasChanged: false,
  isVisible: false,
  postUpload: false,
  activeTabId: 'UPLOAD',
  prevTab: 'UPLOAD',
  files: [],
  isTooSmall: window.innerWidth < 685,
  path: ''
});


export default class AppState extends Component {
  state = {
    config: {},
    activeModules: [],

    ...getInitialState()
  };

  setAppState = (updater, callback) => {
    this.setState(updater, () => {
      if (this.props.debug)
        console.log("setAppState", JSON.stringify(this.state));

      if (callback) callback();
    });
  };

  render() {
    return (
      <div className="app-state">
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            appState: this.state,
            setAppState: this.setAppState
          });
        })}
      </div>
    );
  }
}