import React from "react";
import Reloader from "./reloader.gif";

export default () => {
  return (
    <div>
      <img
        src={Reloader}
        style={{ width: "650px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
