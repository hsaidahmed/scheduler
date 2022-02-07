
export function getAppointmentsForDay(state, day) {
  const filtereDday = state.days.filter((Day) => Day.name === day);
  if (!filtereDday.length) return [];
  const array = [];
  for (const id of filtereDday[0].appointments) {
    array.push(state.appointments[id]);
  }
  return array;
}
export function getInterview(state, interview) {
  if (interview) {
    const interviewData = {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] }
    };
    return interviewData;
  };
  return null;
}
export function getInterviewersForDay(state, day) {
  const filtereDday = state.days.filter((Day) => Day.name === day);
  if (!filtereDday.length) return [];
  const arrayOfInterviewers = [];
  for (const id of filtereDday[0].interviewers) {
    arrayOfInterviewers.push(state.interviewers[id]);
  }
  return arrayOfInterviewers;
}