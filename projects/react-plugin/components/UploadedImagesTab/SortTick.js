import React from 'react';
import PropTypes from 'prop-types';

export const SortTick = ({ active, isUp, color, flex }) => (
  <span className="sort-tick-wrapper" style={flex ? {display: 'flex'} : {}}>
    {active && <span className={`sort-tick${isUp ? ' icon-up' : ' icon-down'}${color ? ` ${color}` : ''}`} />}
  </span>
);

SortTick.defaultProps = {
  active: false,
  isUp: false
};

SortTick.propTypes = {
  active: PropTypes.bool.isRequired,
  isUp: PropTypes.bool.isRequired
};

export default SortTick;