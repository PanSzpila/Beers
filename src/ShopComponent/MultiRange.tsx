/*  https://github.com/developergovindgupta/multi-range-slider-react */

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import MultiRangeSlider from "multi-range-slider-react";
import { resetAbvRangeFalse } from "../redux/resetAbvRange";
import {
  changeFilterAbv_gt,
  changeFilterAbv_lt,
  changeFilterPage,
} from "../redux/filters";

function MultiRange(props: {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step: number;
  ruler: boolean;
  label: boolean;
  preventWheel?: boolean;
}) {
  const filters = useAppSelector((state) => state.filters);

  const reset = useAppSelector((state) => state.resetAbvRange.reset);
  const dispatch = useAppDispatch();
  const [minValue, set_minValue] = useState(props.minValue);
  const [maxValue, set_maxValue] = useState(props.maxValue);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    const output = (minValue, maxValue) => {
      dispatch(changeFilterAbv_gt(minValue));
      dispatch(changeFilterAbv_lt(maxValue));
      dispatch(changeFilterPage(1));
      //     props.setAbv(minValue, maxValue);
    };
    output(minValue, maxValue);
  }, [minValue, maxValue]);

  useEffect(() => {
    resetRange();
  }, [reset]);

  const resetRange = () => {
    if (reset) {
      set_minValue(props.minValue);
      set_maxValue(props.maxValue);
      dispatch(resetAbvRangeFalse());
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
