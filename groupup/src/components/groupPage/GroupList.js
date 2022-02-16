import React from "react";
import Group from "./Group";
import "./group.css";
const GroupList = () => {
  const x = [
    ["gr1", "desc"],
    ["gr2", "desc2"],
  ];
  const xMap = x.map((i) => (
    <Group
      name={i[0]}
      members={["Helle", "Espen"]}
      interests={["Football"]}
      location={""}
    />
  ));
  return <div className="group-list">{xMap}</div>;
};

export default GroupList;
