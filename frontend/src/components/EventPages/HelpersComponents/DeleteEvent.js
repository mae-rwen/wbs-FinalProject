import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";


export default function EventDeleted() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);


  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      navigate('/profile');
    }
  }, [navigate, remainingTime]);

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        You have successfully deleted your event!
      </h4>
      <p>You'll be redirected to your user profile {remainingTime} seconds...</p>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            href="/profile"          
          >
            Go to the user profile
          </Button>
          <Button
            variant="outline-secondary"
            href="/allevents"       
          >
            Go to all events
          </Button>
        </div>
      </div>
    </div>
  );
}
