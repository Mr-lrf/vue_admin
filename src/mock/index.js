import Mock from 'mockjs'

import tableAPI from './students'

// 用户相关
Mock.mock(RegExp('/student/list' + '.*'), 'get', tableAPI.getStudentList)
Mock.mock('/student/remove', 'post', tableAPI.deleteStudent)
Mock.mock('/student/add', 'post', tableAPI.createStudent)
Mock.mock('/student/update', 'put', tableAPI.updateStudent)
