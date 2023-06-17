export default (to, from, next) => {
  if (localStorage.getItem('EasyCoAdmUser') != null) {
    next()
  } else {
    localStorage.removeItem('EasyCoAdmUser')
    next('/login')
  }
}
