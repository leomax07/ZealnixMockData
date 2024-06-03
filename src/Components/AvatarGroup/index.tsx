import React, { useEffect, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import Alphabet from "../../utils/alphabet";
import { fnFirstcharacter } from "../../utils/reusableFunctions";
import "./avatarGroup.scss";

interface AvatarGroupProps {
  item: {
    profileImageUrl: string;
    name: string;
  }[];
  size: any;
}

export default function CommonAvatarGroup({ item, size }: AvatarGroupProps) {
  const [width, setwidth] = useState("");
  const [height, setheight] = useState("");

  useEffect(() => {
    switch (size) {
      case "small":
        setwidth("25px");
        setheight("25px");
        break;
      case "medium":
        setwidth("33px");
        setheight("33px");
        break;
      case "large":
        setwidth("40px");
        setheight("40px");
        break;

      default:
        setwidth("33px");
        setheight("33px");
        break;
    }
  }, [size]);
  return (
    <div>
      {item && item.length > 0 && (
        <div className="avatar__group">
          <Tooltip target=".disabled-button" />
          {item.slice(0, 3).map((imageItem) => {
            if (imageItem.profileImageUrl)
              return (
                <div
                  key={imageItem.name}
                  style={{ marginLeft: "-8px" }}
                  data-pr-tooltip={imageItem.name}
                  data-pr-position="bottom"
                  data-pr-classname="blue-tooltip "
                  className="disabled-button cursor-pointer"
                >
                  <img
                    src={imageItem.profileImageUrl}
                    alt={imageItem.name}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #FFFFFF",
                      width: "33px",
                      height: "33px",
                    }}
                  />
                </div>
              );
            return (
              <div
                key={imageItem.name}
                style={{ marginLeft: "-8px" }}
                data-pr-tooltip={imageItem.name}
                data-pr-position="bottom"
                data-pr-classname="blue-tooltip "
                className="disabled-button cursor-pointer"
              >
                <Alphabet
                  letter={fnFirstcharacter(imageItem.name)}
                  width={width}
                  height={height}
                  fontSize={size ? "10px" : "14px"}
                  border="1px solid #FFFFFF"
                />
              </div>
            );
          })}
          {Math.sign(item.length - 3) === 1 && (
            <div style={{ marginLeft: "-8px" }}>
              <div
                style={{
                  width,
                  height,                  
                }}
                className="avatar__number"
              >
                <span
                  style={{ fontSize: size ? "10px" : "14px", color: "white" }}
                  className="font-bold"
                >{`+ ${item.length - 3}`}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
