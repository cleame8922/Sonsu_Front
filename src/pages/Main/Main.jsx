import React from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";

export default function Main() {
  return (
    <div
      className=""
      style={{
        background: "linear-gradient(180deg, #FFF 0%, #FFF7DF 100%)",
      }}
    >
      <div>
        <Main1 />
      </div>
      <div>
        <Main2 />
      </div>
    </div>
  );
}
