import Realm from 'realm';

class Contact extends Realm.Object {}

Contact.schema = {
    name: "Contact",
    properties: {
        recordID: 'int',
        givenName: 'string',
        phoneNumber: 'string'
    },
    primaryKey:"recordID",
};

let realm = new Realm ({schema:[Contact], schemaVersion: 5});

let getAllContacts = ()=> {
    return realm.objects("Contact");
}
let addContact = (_recordID, _givenName, _phoneNumber) => {
    realm.write(()=>{
        const contact = realm.create("Contact",{
            recordID: _recordID,
            givenName: _givenName,
            phoneNumber: _phoneNumber
        });
    })
}

let deleteAllContact = () => {
    realm.write(() => {
        realm.deleteAll()
    })
}
let deleteContact = (num) => {
    realm.write(()=>{
        const contactToDelete = realm.objects('Contact').filtered(`recordID = "${num}"`);
        realm.delete(contactToDelete)
    })
}
export default realm;

export{
    getAllContacts, addContact, deleteAllContact,deleteContact
}