import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";

export default function EventsList({ events }) {
  return (
    <>
      <ListGroup className="eventsList" as="ul">
        {events.map((event) => {
          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start" key={event._id}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{event.title}</div>
                {event.general_location} || Date || Time || Created by XX || searching for XX
                people
              </div>
              <Badge bg="secondary" pill>
                already joined: 2
              </Badge>
              <NavLink
               to={`/event/${event._id}`} 
               >see more </NavLink>

            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
