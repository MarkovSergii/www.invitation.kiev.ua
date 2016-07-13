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
        country_id: {
            type: Sequelize.INTEGER
        },
        country_text: {
            type: Sequelize.STRING
        },
        oblast_id: {
            type: Sequelize.INTEGER
        },
        oblast_text: {
            type: Sequelize.STRING
        },
        city_id: {
            type: Sequelize.INTEGER
        },
        city_text: {
            type: Sequelize.STRING
        },
        postindex: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        street_num: {
            type: Sequelize.STRING
        },
        office: {
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
            type: Sequelize.TEXT
        },
        content_en: {
            type: Sequelize.TEXT
        },
        content_ukr: {
            type: Sequelize.TEXT
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
    Exhibitions : sequelize.define('exhibitions', {
        content_ru: {
            type: Sequelize.TEXT
        },
        content_en: {
            type: Sequelize.TEXT
        },
        content_ukr: {
            type: Sequelize.TEXT
        },
        content_res_ru: {
            type: Sequelize.TEXT
        },
        content_res_en: {
            type: Sequelize.TEXT
        },
        content_res_ukr: {
            type: Sequelize.TEXT
        },
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        date_begin: {
            type: Sequelize.DATE
        },
        date_end: {
            type: Sequelize.DATE
        },
        visible: {
            type: Sequelize.BOOLEAN, defaultValue: false
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
    }),
    Questions : sequelize.define('questions', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        exhibition_id: {
            type: Sequelize.INTEGER
        },
        order_by: {
            type: Sequelize.INTEGER
        },
        is_first: {
            type: Sequelize.BOOLEAN
        },
        q_type: {
            type: Sequelize.STRING
        },
        is_pro: {
            type: Sequelize.BOOLEAN
        },
        have_other: {
            type: Sequelize.BOOLEAN
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Answers : sequelize.define('answers', {
        name_ru: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_ukr: {
            type: Sequelize.STRING
        },
        question_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Users_orders : sequelize.define('users_orders', {
        user_id: {
            type: Sequelize.INTEGER
        },
        exhibition_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Users_answers : sequelize.define('users_answers', {
        user_id: {
            type: Sequelize.INTEGER
        },
        exhibition_id: {
            type: Sequelize.INTEGER
        },
        question_id: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.STRING
        },
        text_value: {
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
//obj.Exhibitions.sync({force: true});
//obj.Questions.sync({force: true});
//obj.Answers.sync({force: true});
//obj.Users_orders.sync({force: true});
//obj.Users_answers.sync({force: true});


module.exports = obj;