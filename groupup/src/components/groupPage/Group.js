import React from "react";
import "./group.css";
import PropTypes from "prop-types";

const Group = ({
  name,
  members,
  description,
  interests,
  location,
  picture,
  meetingDate,
}) => {
  const memberMap = members.map((member) => member + ", ");
  const interestsMap = interests.map((interest) => interest + ", ");
  return (
    <div className="group-container">
      <span>
        <img src={require("./friends.png")} />
        <h3 className="group-info">{name}</h3>
        {members !== [] ? (
          <div className="group-info">Members: {memberMap}</div>
        ) : (
          ""
        )}
        {interests !== [] ? (
          <div className="group-info">Interests: {interestsMap}</div>
        ) : (
          ""
        )}
        {location !== "" ? (
          <div className="group-info">Location: {location}</div>
        ) : (
          ""
        )}
        {meetingDate !== "" ? (
          <div className="group-info">Meeting Date: {meetingDate}</div>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

Group.propTypes = {
  meetingDate: PropTypes.string,
  location: PropTypes.string,
  interests: PropTypes.array,
  members: PropTypes.array,
};

Group.defaultProps = {
  meetingDate: "",
  location: "",
  members: [],
  interests: [],
};

export default Group;
