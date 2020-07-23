import React from 'react';

const drawerToggleButton = (props) => (
  <React.Fragment>
    {!props.sideDrawerOpen ? (
      <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </button>
    ) : (
      <button className="toggle-button" onClick={props.click}>
        <span className="toggle-button_close">X</span>
      </button>
    )}
  </React.Fragment>
);

export default drawerToggleButton;
