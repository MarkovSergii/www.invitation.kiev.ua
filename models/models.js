/**
 * Created by user on 01.06.2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('invitation', 'root', '12345', {
    host: '93.171.158.114',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

var obj = {
    sequelize:sequelize,
    Users : sequelize.define('users', {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        email_verification_status: {
            type: Sequelize.BOOLEAN
        },
        email_verification_code: {
            type: Sequelize.STRING
        },
        banned_status: {
            type: Sequelize.BOOLEAN
        },
        banned_comment: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Pages : sequelize.define('pages', {
        name: {
            type: Sequelize.STRING
        },
        content_ru: {
            type: Sequelize.STRING
        },
        content_en: {
            type: Sequelize.STRING
        },
        content_ukr: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Country : sequelize.define('country', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        order_by: {
    type: Sequelize.INTEGER
}
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Oblast : sequelize.define('oblast', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        order_by: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    City : sequelize.define('city', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        oblast_id: {
            type: Sequelize.INTEGER
        },
        order_by: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Menus : sequelize.define('menu', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        visible: {
            type: Sequelize.BOOLEAN, defaultValue: true
        },
        sort_position: {
            type: Sequelize.INTEGER, defaultValue: 1
        },
        root_id: {
            type: Sequelize.INTEGER
        },
        page_id: {
            type: Sequelize.INTEGER
        },
        link_ru: {
            type: Sequelize.STRING
        },
        link_en: {
            type: Sequelize.STRING
        },
        link_ukr: {
            type: Sequelize.STRING
        },
        content_type: {
            type: Sequelize.STRING
        }

    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Smtp_settings : sequelize.define('smtp_settings', {
        smtp_server: {
            type: Sequelize.STRING
        },
        smtp_port: {
            type: Sequelize.STRING
        },
        sender_address: {
            type: Sequelize.STRING
        },
        smtp_user: {
            type: Sequelize.STRING
        },
        smtp_password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Settings : sequelize.define('settings', {
    name: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

};

//obj.Users.sync({force: true});
//obj.Pages.sync({force: true});
//obj.Menus.sync({force: true});
//obj.Smtp_settings.sync({force: true});
//obj.Settings.sync({force: true});
//obj.Country.sync({force: true});
//obj.Oblast.sync({force: true});
//obj.City.sync({force: true});
module.exports = obj;