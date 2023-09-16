const ToggleView = (props: any) => {
  return (
    <div className="col-auto">
      {/* buttons - toggle View */}
      <svg
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="grid-icon"
        className={props.showCards ? "svg-active" : "svg"}
        onClick={() => {
          props.setShowCardsToParent(true);
        }}
      >
        <path
          d="M10 13l1 1v7l-1 1H3l-1-1v-7l1-1h7zm7.5 0c2.481 0 4.5 2.018 4.5 4.5S19.981 22 17.5 22a4.505 4.505 0 01-4.5-4.5c0-2.482 2.019-4.5 4.5-4.5zM9 15H4v5h5v-5zm8.5 0a2.503 2.503 0 00-2.5 2.5c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5zM10 2l1 1v7l-1 1H3l-1-1V3l1-1h7zm11 0l1 1v7l-1 1h-7l-1-1V3l1-1h7zM9 4H4v5h5V4zm11 0h-5v5h5V4z"
          fillRule="evenodd"
        ></path>
      </svg>
      <svg
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="list-icon"
        className={props.showCards ? "svg" : "svg-active"}
        onClick={() => {
          props.setShowCardsToParent(false);
        }}
      >
        <path
          d="M3.768 15.99l.59 1.02-.59 1.022H2.59L2 17.01l.59-1.021h1.178zm17.41 0l.217.217.567.566.217.217-1 1h-14l-1-1 1-1h14zm-17.41-4.948l.589 1.02-.589 1.022H2.589L2 12.063l.589-1.021h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14zM3.769 6l.589 1.02-.589 1.022h-1.18L2 7.02 2.589 6h1.179zm17.41 0l1 1-1 1h-14l-1-1 1-1h14z"
          fillRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ToggleView;
