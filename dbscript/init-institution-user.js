const mongoose = require('mongoose')
const User = require('../models/User')
const { ROLE } = require('../constant.js')
const { INSTITUTION } = require('../constant.js')
const Institution = require('../models/Institution')
mongoose.connect('mongodb://localhost:27017/project')
async function clearUser () {
  await User.deleteMany({})
  await Institution.deleteMany({})
}
async function main () {
  await clearUser()
  // for (let i = 1; i < 12; i++) {
  const InstitutionIF = new Institution({ name: INSTITUTION.IF })
  const InstitutionBS = new Institution({ name: INSTITUTION.BS })
  const user = new User({ username: 'user@mail.com', password: 'password', name: 'Naphat', surname: 'Tisonthi', roles: [ROLE.USER], institution: InstitutionIF })
  const approver = new User({ username: 'approver@mail.com', password: 'password', name: 'Jirat', surname: 'Klomkleaw', roles: [ROLE.APPROVER, ROLE.USER], institution: InstitutionIF })
  const admin = new User({ username: 'admin@mail.com', password: 'password', name: 'Yannapon', surname: 'Surak', roles: [ROLE.ADMIN, ROLE.USER], institution: InstitutionIF })
  const localAdmin = new User({ username: 'local_admin@mail.com', password: 'password', name: 'Chenpob', surname: 'Nopakiat', roles: [ROLE.LOCAL_ADMIN, ROLE.ADMIN, ROLE.USER], institution: InstitutionIF })

  user.save()
  approver.save()
  admin.save()
  localAdmin.save()
  InstitutionIF.users.push(user)
  InstitutionIF.users.push(approver)
  InstitutionIF.users.push(admin)
  InstitutionIF.users.push(localAdmin)
  InstitutionIF.save()
  InstitutionBS.save()
  // }
}

main().then(function () {
  console.log('Finish')
})
