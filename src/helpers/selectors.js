// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }
export function getAppointmentsForDay(state, day) {
  const filtereDday = state.days.filter((Day) => Day.name === day);
  if (!filtereDday.length) return [];
  // return filtereDday[0].appointments;
  // [1,2,3]
  const array = [];
  for (const id of filtereDday[0].appointments) {
    array.push(state.appointments[id]);
  }
  return array;
}
