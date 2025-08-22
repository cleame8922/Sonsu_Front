import React from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import Main5 from "./Main5";

export default function Main() {
  return (
    <div
      className="w-screen"
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
      <div>
        <Main3 />
      </div>
      <div>
        <Main4 />
      </div>
      <div>
        <Main5 />
      </div>
    </div>
  );
}
