import Axios from 'axios'
export const getStudentsList = (params) => {
  return Axios.get('/student/list', {
  params}
  )
}
export const createStudent = (params) => {
  return Axios.post('/student/add',
    params
  )
}
export const updateStudent = (params) => {
  return Axios.put('/student/update',
    params
  )
}
export const removeStudent = (params) => {
  return Axios.post('/student/remove',
    params
  )
}
