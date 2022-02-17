import React from "react";
import "./group.css";
import PropTypes from "prop-types";

const Group = ({
  name,
  members,
  interests,
  location,
  picture,
  meetingDate,
}) => {
  const membersString = members.join(', ')
  const interestsString = interests.join(', ')

  return (
    <div className="group-container" >
      <span>
        <img src={require("./friends.png")} />
        <h3 className="group-info">{name}</h3>
        {members !== [] ? (
          <div className="group-info"><span className="bold">Members:</span> {membersString}</div>
        ) : (
          ""
        )}
        {interests !== [] ? (
          <div className="group-info"><span className="bold">Interests:</span> {interestsString}</div>
        ) : (
          ""
        )}
        {location !== "" ? (
          <div className="group-info"><span className="bold">Location:</span>  {location}</div>
        ) : (
          ""
        )}
        {meetingDate !== "" ? (
          <div className="group-info"><span className="bold">Meeting time:</span>  {meetingDate}</div>
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
