import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  // const formatTime = (time) => {
  //   if (!time) return 'No Appointments';
  //   if (time ) return `Appointment at ${props.time}`
  // }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const deleteInterview = (event) => {
    
    transition(DELETING, true);

    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
      console.log("---------!!!!",props.interview.student)
  })

  };


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          

        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && <Confirm  onConfirm={deleteInterview} onCancel={back} message="Delete the appointment?"/>}
      
      {mode === EDIT && (<Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}

      {mode === ERROR_SAVE && (<Error message="save" onClose={back} />) }

      {mode === ERROR_DELETE && (<Error message="delete" onClose={back} />) }



    </article>
  );
}
