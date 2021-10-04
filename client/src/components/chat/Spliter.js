import * as React from "react";
import { Splitter } from "@progress/kendo-react-layout";
// import "./styles.css";

const Spliter = () => {
  const [panes, setPanes] = React.useState([
    {
      size: "20%",
      min: "20px",
      collapsible: true,
    },
    {},
    {
      size: "30%",
      min: "20px",
      collapsible: true,
    },
  ]);
  const [nestedPanes, setNestedPanes] = React.useState([
    {
      size: "40%",
    },
    {},
    {
      size: "30%",
      resizable: false,
    },
  ]);

  const onChange = (event) => {
    setPanes(event.newState);
  };

  const onNestedChange = (event) => {
    setNestedPanes(event.newState);
  };

  return (
    <div>
      <Splitter
        style={{
          height: 650,
        }}
        panes={nestedPanes}
        orientation={"vertical"}
        onChange={onNestedChange}
      >
        <Splitter panes={panes} onChange={onChange}>
          <div className="pane-content">
            <h3>Inner splitter / left pane</h3>
            <p>Resizable and collapsible.</p>
          </div>
          <div className="pane-content">
            <h3>Inner splitter / center pane</h3>
            <p>Resizable only.</p>
          </div>
          <div className="pane-content">
            <h3>Inner splitter / right pane</h3>
            <p>Resizable and collapsible.</p>
          </div>
        </Splitter>

        <div className="pane-content">
          <h3>Outer splitter / Middle pane</h3>
          <p>Resizable only.</p>
        </div>
        <div className="pane-content">
          <h3>Outer splitter / Bottom pane</h3>
          <p>Non-resizable and non-collapsible.</p>
        </div>
      </Splitter>
    </div>
  );
};

export default Spliter;

