/*  https://github.com/developergovindgupta/multi-range-slider-react */

import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";

function MultiRange(props) {
  const [minValue, set_minValue] = useState(props.minValue);
  const [maxValue, set_maxValue] = useState(props.maxValue);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    const output = (minValue, maxValue) => {
      props.setAbv(minValue, maxValue);
    };
    output(minValue, maxValue);
  }, [minValue, maxValue]);

  useEffect(() => {
    resetRange();
  }, [props.reset]);

  const resetRange = () => {
    if (props.reset) {
      set_minValue(props.minValue);
      set_maxValue(props.maxValue);
      props.reseted();
    }
  };

  return (
    <MultiRangeSlider
      min={props.min ? props.min : 0}
      max={props.max ? props.max : 100}
      step={props.step ? props.step : 5}
      ruler={props.ruler}
      label={props.label}
      preventWheel={props.preventWheel ? props.preventWheel : false}
      minValue={minValue}
      maxValue={maxValue}
      onInput={(e) => {
        handleInput(e);
      }}
    />
  );
}

export default MultiRange;
