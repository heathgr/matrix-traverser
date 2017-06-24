import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import ReactSlider from 'react-slider';
import { PRIMARY_COLOR, ACCENT_BORDER_COLOR } from '../constants/uiColors';

const Slider = ({
  min,
  max,
  onChange,
}) => Style.it(
  `
  .dragger {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: ${PRIMARY_COLOR};
  }

  .sliderWrapper {
    width: 150px;
    height: 20px;
  }

  .slider {
    height: 20px;
    display: flex;
    align-items: center;
  }

  .bar {
    height: 1px;
    margin: 0px 7px;
  }

  .bar-0 {
    background: ${PRIMARY_COLOR};
  }

  .bar-1 {
    background: ${ACCENT_BORDER_COLOR};
  }
  `,
  <div className='sliderWrapper'>
    <ReactSlider
      min={min}
      max={max}
      onChange={onChange}
      withBars
    >
      <div className='dragger' />
    </ReactSlider>
  </div>
);

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
