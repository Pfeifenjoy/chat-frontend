import crypto from "crypto";
import db from "../db";
import Sequelize from "sequelize";
import config from "../config";
import colors from "colors";
import UserStore from "../stores/UserStore";

const standardAdminPassword = config.adminPassword || "chatchatchat";
const standardAdminUsername = config.adminUsername || "admin";
const minPasswordLength = config.minPasswordLength || 10;

//Database connection to the users
const user = db.define("users", {
    username: {
        type: Sequelize.STRING,
        unique: true,
        set: function(val) {
            if(val.trim() === "")
                throw "incorrect username";
            this.setDataValue("username", val);
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        set: function(val) {
            if(val.length < minPasswordLength) throw "password to short";
            this.setDataValue("password",
                crypto.createHash("md5")
                    .update(val)
                    .digest("hex")
            );
        }
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    instanceMethods: {
        checkPassword: function(password) {
            return this.password === crypto.createHash("md5").update(password).digest("hex");
        }
    },
    freezeTableName: true
});

const contact = db.define("contact", {
    contactName: {
        type: Sequelize.STRING
    }
});
user.hasMany(contact, {as: "Contacts"});

contact.sync();

//Always update or create the admin user.
user.sync().then(() => {
    new User({
        username: standardAdminUsername,
        password: standardAdminPassword,
        admin: true
    }).save().then(() => {
        console.log("updated admin user");
        if(!config.standardPassword || config.standardPassword === standardAdminPassword)
            console.warn(colors.yellow.bold("Warning: Please reset the standard password of the admin user!!!"));
    });
});


class User {
    constructor(values) {
        this._values = values;
        this.username = values.username;
    }
    save() {
        console.log("saving user: " + this._values.username);
        return user.upsert(this._values);
    }
    register() {
        console.log("register user: " + this._values.username);
        return user.create(this._values);
    }
    checkPassword(password) {
        return new Promise((resolve, reject) => {
            user.findOne({where: {username: this._values.username}}).then(user => {
                if(user && user.checkPassword(password)) {
                    resolve(user.password);
                } else {
                    reject("Wrong password");
                }
            });
        });
    }

    _getDb() {
        return user.findOne({where: {username: this.username}});
    }

    addContact(contactName) {
        return new Promise((resolve, reject) => {
            this._getDb().then(currentUser => {
                user.findOne({where: {username: contactName}})
                    .then(result => {
                        if(!result) {
                            reject({reason: "contact does not exist."});
                            return;
                        }
                        contact.create({contactName}).then(contact => {
                            currentUser.addContact(contact).then(resolve)
                                .catch(e => {reject(e)});
                        }).catch(e => {reject(e)});
                    });
            });
        });
    }

    deleteContact(contactName) {
        return new Promise((resolve, reject) => {
            this._getDb().then(currentUser => {
                user.findOne({where: {username: contactName}})
                    .then(result => {
                        if(!result) {
                            reject({reason: "contact does not exist."});
                            return;
                        }
                        else {
                            result.destroy();
                        }
            })
        })
    })
}

getContacts() {
    return new Promise((resolve, reject) => {
        this._getDb().then(user => {
            contact.findAll({where: {userId: user.id}}).then(contacts => {
                resolve(contacts.map(contact => {
                    return {
                        username: contact.contactName,
                        online: UserStore.connectedUsers[contact.contactName] || false
                    };
                }));
            });
        }).catch(e => {
            reject(e);
        });
    });
}
}


export default User;

