const { program } = require('commander')
const contacts = require('./contacts')
require('colors')

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse()

const options = program.opts()

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContacts = await contacts.listContacts()
      console.log(listContacts)
      break

    case 'get':
      const oneContact = await contacts.getContactById(id)
      console.log(oneContact)
      break

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone })
      console.log(newContact)
      break

    case 'remove':
      const deleteContact = await contacts.removeContact(id)
      console.log(deleteContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!'.rainbow)
  }
}
invokeAction(options)
// list:
// invokeAction({ action: 'list' })
// node index -a list

// getById:
// invokeAction({ action: 'get', id: 'C9sjBfCo4UJCWjzBnOtxl' })
// node index -a get -i  vza2RIzNGIwutCVCs4mCL

// removeById:
// invokeAction({ action: 'remove', id: 'qdggE76Jtbfd9eWJHrssH' })
// node index -a remove -i  qdggE76Jtbfd9eWJHrssH

// add:
// invokeAction({
//   action: 'add',
//   name: 'Jane',
//   email: 'jane@gmail.com',
//   phone: '+380635007033',
// })
// node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22
