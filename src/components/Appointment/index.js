import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  // const formatTime = (time) => {
  //   if (!time) return 'No Appointments';
  //   if (time ) return `Appointment at ${props.time}`
  // }
  console.log("props----",props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      : 
        <Empty />
      }
    </article>
  );
}
