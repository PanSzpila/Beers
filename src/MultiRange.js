import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";

function MultiRange(props) {
  const [minValue, set_minValue] = useState(props.minValue);
  const [maxValue, set_maxValue] = useState(props.maxValue);
  const [reset, set_reset] = useState(props.reset);
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
    console.log("useEffect on reset works"); //Fixme: this useEffect not working when reset value changes
    resetRange();
  }, [reset]);

  const resetRange = () => {
    if (reset === true) {
      console.log("reseting range slider");
      set_minValue(props.minValue);
      set_maxValue(props.maxValue);
      set_reset(false);
    }
  };

  return (
    <div className="App">
      <label
        htmlFor="MultiRange"
        className="form-label"
        id="multiRangeSliderLabel"
      >
        alcohol % (ABV)
      </label>
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
    </div>
  );
}

export default MultiRange;
