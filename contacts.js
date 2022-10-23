import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";


const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactToGet = JSON.parse(data).find(({ id }) => id === contactId);
    if (contactToGet) {
      console.log(contactToGet);
    } else {
      console.log("ой, немає контакту з таким ідентифікатором");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const deletedContact = JSON.parse(data).find(({ id }) => id === contactId);
    if (deletedContact) {
      console.log(`контакт ${deletedContact.name} було видалено`);
    } else {
      console.log("ой, немає контакту з таким ідентифікатором");
      return;
    }
    const newContactList = JSON.parse(data).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf8");
    console.log("новий список контактів");
    console.table(newContactList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContactList = [...parsedData, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf8"
    );
    console.log(`${newContact.name} було додано`);
    console.log("новий список контактів");
    console.table(newContactList);
  } catch (error) {
    console.log(error);
  }
}

export { listContacts, getContactById, removeContact, addContact };
