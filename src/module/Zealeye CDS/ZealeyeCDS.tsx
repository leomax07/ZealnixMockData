import React from "react";
import "./ZealeyeCDS.scss";

export default function ZealeyeCDS() {
  return (
    <div className="container">
      <div className="sub_container">
        <div className="New_chat"> + New Chat</div>
      </div>
      <div className="box_contaier">
        <h1 className="Title_text">Zealeye CDS</h1>
        <div className="grid_container">
          <div className="box">
            <h4 className="box_text">Examples</h4>
            <div className="sub_box">
              <h5 className="sub_box_text">
                "Explain quantum computing insimple terms"
              </h5>
            </div>
            <div className="sub_box">
              <h5 className="sub_box_text">
                "Got any creative ideas for a 10year old's birthday?"
              </h5>
            </div>
            <div className="sub_box">
              <h5 className="sub_box_text">
                "How do I make an HTTP requestin Javascript?"
              </h5>
            </div>
          </div>
          <div className="box">
            <h4 className="box_text">Capabilities</h4>
            <div className="sub_box">
              <h5 className="sub_box_text">
                Remembers what user said earlier in the conversation.
              </h5>
              <h5 className="sub_box_text">
                Allows user to provide follow-up corrections.
              </h5>
              <h5 className="sub_box_text">
                Trained to decline inappropriate requests.
              </h5>
            </div>
          </div>
          <div className="box">
            <h4 className="box_text">Limitations</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
