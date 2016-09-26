var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open'
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }},
    {
        getterMethods : {
            route: function () {
                return '/wiki/' + this.urlTitle;
            }
        },
        hooks: {
            beforeValidate: function (page) {
                if (!page.title) {
                    page.urlTitle = Math.random().toString(36).substring(2,7);
                } else {
                    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W+/g, "");
                }
            }
        }
    }
);


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};
