import React, { useContext, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AuthContext from "../../../context/AuthProvider";
import { Badge, ListGroupItem } from "react-bootstrap";
import "./eventdisplay.css";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import placeholder from "./placeholder.png";

function Joined() {
  const { joined } = useContext(AuthContext);
  const [visible, setVisible] = useState(3);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <div>
      {joined?.length !== 0 ? (
        <>
          <ListGroup as="ul">
            {joined.slice(0, visible).map((val) => {
              // get the date
              const date = new Date(val.event?.date);
              const year = date.getFullYear();
              const day = date.getDate();
              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              const month = months[date.getMonth()];
              const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              const weekday = days[date.getDay()];
              const formattedDate =
                weekday && day && month && year
                  ? `${weekday}, ${day} ${month} ${year}`
                  : null;

              // get the time
              const hour = date.getHours().toString();
              const minutes = date.getMinutes().toString();
              const formattedTime =
                hour && minutes
                  ? `${hour.length === 2 ? hour : "0" + hour}:${
                      minutes.length === 2 ? minutes : "0" + minutes
                    }`
                  : null;

              return (
                <ListGroupItem as="li" key={val._id} id="joinedItem">
                  <span id="createdEventTitle">
                    <h5 className="fw-bold mt-2 mb-3">{val.event?.title}</h5>
                    <Badge
                      bg="secondary"
                      pill
                      id="thumbnailBadge"
                      className="mt-2"
                    >
                      Joined: {val.event?.joined ? val.event?.joined : "0"}/
                      {val.event?.participants}
                    </Badge>
                  </span>

                  <div id="underTheTitle">
                    <span id="titleAndThumbnail">
                      <Figure id="joinedThumbnail">
                        <Figure.Image
                          alt="thumbnail"
                          src={placeholder}
                          thumbnail
                        />
                      </Figure>
                    </span>

                    <div id="joinedDescription">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {" "}
                          in {val.event?.general_location}{" "}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          on{" "}
                          {formattedDate ? formattedDate : `not specified date`}{" "}
                          at{" "}
                          {formattedTime ? formattedTime : `not specified time`}
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <div id="joinedBtns">
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="tooltip-leave">
                                  Go to the event page
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="warning"
                                href={`/event/${val.event?._id}`}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3 mt-3">
            <Button
              className="w-30 mt-3"
              variant="secondary"
              onClick={loadMore}
            >
              Load more
            </Button>
          </div>
        </>
      ) : (
        <div>
          <h6 className="display-8 fw-bold">
            You haven't joined any events yet
          </h6>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
            <Button variant="outline-warning" href="/allevents">
              Browse the events
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Joined;
