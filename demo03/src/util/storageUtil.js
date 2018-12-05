/*
  对webStorage的操作
*/
const TODOS = 'todos'
export default {
  readTodos(){
    return JSON.parse(window.localStorage.getItem(TODOS) || '[]')
  },
  writeTodos(val){
    window.localStorage.setItem(TODOS, JSON.stringify(val))
  }
}
