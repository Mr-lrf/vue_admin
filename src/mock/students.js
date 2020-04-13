import Mock from 'mockjs'

function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

let List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname() + i,
    'age|18-24': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getStudentList: config => {
    const { name, page = 1, limit = 10 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      data: pageList
    }
  },
  /**
   * 增加学生
   * @param name,  age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createStudent: config => {
    console.log(config)
    const { name, age, birth, sex } = JSON.parse(config.body)
    List.push({
      id: Mock.Random.guid(),
      name: name,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除学生  
   * @param id
   * @return {*}
   */
  deleteStudent: config => {
      console.log(config)
    const { id } =JSON.parse(config.body)
    if (!id) {
      return {
        code: 500,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 修改学生
   * @param id, name, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateStudent: config => {
    const { id, name, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}
