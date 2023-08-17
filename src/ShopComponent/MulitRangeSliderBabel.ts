// This file is not in use. Its for info, how multi range slider component is built

class DoubleRangeSlider extends React.Component {
  maxValue: any;
  minValue: any;
  onMouseUp: any;
  slider: any;
  state = {
    sliderWidth: 0,
    offsetSliderWidht: 0,
    min: 0,
    max: 200,
    minValueBetween: 10,

    currentMin: 55,
    inputMin: 55,

    currentMax: 100,
    inputMax: 100,
  };

  componentDidMount() {
    const { currentMin, currentMax, max } = this.state;


    this.minValue.style.width = (currentMin * 100) / max + "%";

    this.maxValue.style.width = (currentMax * 100) / max + "%";

    this.setState({

      sliderWidth: this.slider.offsetWidth,

      offsetSliderWidht: this.slider.offsetLeft,
    });
  }

  setMin = (e) => {
    const { min, max, currentMax, minValueBetween } = this.state;
    const inputMin = e.target.value;

    this.setState({
      inputMin,
    });

    if (inputMin >= min && inputMin <= currentMax - minValueBetween) {
      this.setState({
        currentMin: parseInt(inputMin),
      });


      this.minValue.style.width = (inputMin * 100) / max + "%";
    }
  };

  changeMinValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMin);
    document.addEventListener("mouseup", this.onMouseUpMin);

    document.addEventListener("touchmove", this.onMouseMoveMin);
    document.addEventListener("touchend", this.onMouseUpMin);
  };

  onMouseMoveMin = (e) => {
    const {
      min,
      max,
      currentMax,
      minValueBetween,
      sliderWidth,
      offsetSliderWidht,
    } = this.state;

    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;


    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const currentMin = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    console.log(e.pageX, e.clientX, offsetSliderWidht);

    console.log(currentMin, currentMax - minValueBetween);

    console.log((max * dragedWidhtInPercent) / 100);

    if (currentMin >= min && currentMin <= currentMax - minValueBetween) {

      this.minValue.style.width = dragedWidhtInPercent + "%";

      this.minValue.dataset.content = currentMin;

      this.setState({
        currentMin,
        inputMin: currentMin,
      });
    }
  };

  onMouseUpMin = () => {
    document.removeEventListener("mouseup", this.onMouseUpMin);
    document.removeEventListener("mousemove", this.onMouseMoveMin);

    document.removeEventListener("touchend", this.onMouseMoveMin);
    document.removeEventListener("touchmove", this.onMouseUpMin);
  };

  setMax = (e) => {
    const { min, max, currentMin, currentMax, minValueBetween } = this.state;

    const inputMax = e.target.value;

    this.setState({
      inputMax,
    });

    if (inputMax >= currentMin + minValueBetween && inputMax <= max) {
      this.setState({
        currentMax: parseInt(inputMax),
      });

      this.maxValue.style.width = (inputMax * 100) / max + "%";
    }
  };

  changeMaxValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMax);
    document.addEventListener("mouseup", this.onMouseUpMax);

    document.addEventListener("touchmove", this.onMouseMoveMax);
    document.addEventListener("touchend", this.onMouseUpMax);
  };

  onMouseMoveMax = (e) => {
    const { max, currentMin, minValueBetween, sliderWidth, offsetSliderWidht } =
      this.state;

    const maxWalueThumb = this.maxValue;
    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;


    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const currentMax = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    if (currentMax >= currentMin + minValueBetween && currentMax <= max) {
      maxWalueThumb.style.width = dragedWidhtInPercent + "%";
      maxWalueThumb.dataset.content = currentMax;
      this.setState({
        currentMax,
        inputMax: currentMax,
      });
    }
  };

  onMouseUpMax = () => {

    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMoveMax);


    document.removeEventListener("touchend", this.onMouseUp);
    document.removeEventListener("touchmove", this.onMouseMoveMax);
  };

  maxForMin = () => {
    const { currentMax, minValueBetween } = this.state;
    return currentMax - minValueBetween;
  };

  minForMax = () => {
    const { currentMin, minValueBetween } = this.state;
    return currentMin + minValueBetween;
  };

  render() {
    const {
      min,
      max,
      currentMin,
      inputMin,
      currentMax,
      inputMax,
      minValueBetween,
    } = this.state;

    return (


      // @ts-expect-error TS(2304): Cannot find name 'div'.
      <div className="card">


        // @ts-expect-error TS(2304): Cannot find name 'h2'.
        <h2>Double range slider</h2>


        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className="current-value">


          // @ts-expect-error TS(2304): Cannot find name 'label'.
          <label htmlFor="min-input">Min: </label>


          // @ts-expect-error TS(2304): Cannot find name 'input'.
          <input


            // @ts-expect-error TS(2663): Cannot find name 'id'. Did you mean the instance m... Remove this comment to see the full error message
            id="min-input"


            // @ts-expect-error TS(2304): Cannot find name 'type'.
            type="number"


            // @ts-expect-error TS(2304): Cannot find name 'onChange'.
            onChange={this.setMin}


            // @ts-expect-error TS(2304): Cannot find name 'value'.
            value={inputMin}


            // @ts-expect-error TS(2588): Cannot assign to 'min' because it is a constant.
            min={min}


            // @ts-expect-error TS(2588): Cannot assign to 'max' because it is a constant.
            max={this.maxForMin}
          />



          // @ts-expect-error TS(2304): Cannot find name 'br'.
          <br />


          // @ts-expect-error TS(2304): Cannot find name 'label'.
          <label htmlFor="max-input">Max: </label>


          // @ts-expect-error TS(2304): Cannot find name 'input'.
          <input


            // @ts-expect-error TS(2663): Cannot find name 'id'. Did you mean the instance m... Remove this comment to see the full error message
            id="max-input"


            // @ts-expect-error TS(2304): Cannot find name 'type'.
            type="number"


            // @ts-expect-error TS(2304): Cannot find name 'onChange'.
            onChange={this.setMax}


            // @ts-expect-error TS(2304): Cannot find name 'value'.
            value={inputMax}


            // @ts-expect-error TS(2588): Cannot assign to 'min' because it is a constant.
            min={this.minForMax}


            // @ts-expect-error TS(2588): Cannot assign to 'max' because it is a constant.
            max={max}
          />
        </div>



        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className="values">


          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div>{min}</div>


          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div>{max}</div>
        </div>



        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div ref={(ref) => (this.slider = ref)} id="slider">


          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div


            // @ts-expect-error TS(2304): Cannot find name 'ref'.
            ref={(ref) => (this.minValue = ref)}


            // @ts-expect-error TS(2304): Cannot find name 'id'.
            id="min"


            // @ts-expect-error TS(2304): Cannot find name 'data'.
            data-content={currentMin}
          >


            // @ts-expect-error TS(2304): Cannot find name 'div'.
            <div


              // @ts-expect-error TS(2304): Cannot find name 'ref'.
              ref={(ref) => (this.minValueDrag = ref)}


              // @ts-expect-error TS(2304): Cannot find name 'id'.
              id="min-drag"


              // @ts-expect-error TS(2304): Cannot find name 'onMouseDown'.
              onMouseDown={this.changeMinValue}


              // @ts-expect-error TS(2304): Cannot find name 'onTouchStart'.
              onTouchStart={this.changeMinValue}
            ></div>
          </div>



          // @ts-expect-error TS(2304): Cannot find name 'div'.
          <div


            // @ts-expect-error TS(2304): Cannot find name 'ref'.
            ref={(ref) => (this.maxValue = ref)}


            // @ts-expect-error TS(2304): Cannot find name 'id'.
            id="max"


            // @ts-expect-error TS(2304): Cannot find name 'data'.
            data-content={currentMax}
          >


            // @ts-expect-error TS(2304): Cannot find name 'div'.
            <div


              // @ts-expect-error TS(2304): Cannot find name 'ref'.
              ref={(ref) => (this.maxValueDrag = ref)}


              // @ts-expect-error TS(2304): Cannot find name 'id'.
              id="max-drag"


              // @ts-expect-error TS(2304): Cannot find name 'onMouseDown'.
              onMouseDown={this.changeMaxValue}


              // @ts-expect-error TS(2304): Cannot find name 'onTouchStart'.
              onTouchStart={this.changeMaxValue}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}



// @ts-expect-error TS(2352): Conversion of type 'RegExp' to type 'DoubleRangeSl... Remove this comment to see the full error message
ReactDOM.render(<DoubleRangeSlider />, document.getElementById("root"));
