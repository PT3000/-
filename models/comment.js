/*const sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({

            comment:{
                type: sequelize.StringDataType(100),
                allowNull: false,
            },
            creat_at: {
                type: sequelize.DATA,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        },  {
            sequelize,
            timestamps: false,
            modelNmae: "Comment",
            tableName: "comments",
            paranoid: false,
            charset: "utf8m4",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {}
    
}

*/

/*const { sequelize, Sequelize } = require("sequelize");
const sequelize = require('sequelize');
const { defaultValueSchemable, underscoredIf } = require("sequelize/types/utils");

module.exports = class User extends Sequelize.model{
    static init(sequelize){
        return super.init({

            number : {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },

            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type:Sequelize.STRING(100),
                allowNull: true,
            },
            /*age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            creat_at: {
                type: Sequelize.DATE,
                allowfull: false,
                defaultValue: Sequelize.NOW,
            }, 
        }, {
            Sequelize,
            timestamps: false,
            underscoredIf: false,
            modelName: "User",
            tableName: "Users",
            paranold: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        });
    }
    static associate(db) {}
};

*/

const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  // init 메서드 테이블에 대한 설정을 하고
  // associate 메서드는 다른 모델과의 관계를 적습니다
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED, //양수
        },
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize, //해당 부분에 db.sequelize 객체가 들어간다.
        timestamps: true, //true로 하면 createdAt과 updatedAt을 생성한다.
        underscored: false, //기본적으로 테이블명과 컬럼명을 CamelCase로 바꾸는데 snake case로 변경해준다
        modelName: "Comment", //모델 이름을 설정할 수있다
        tableName: "Comment", //기본적으로 모델이름을 소문자및 복수형으로 만드는데 모델이 User면 users가된다
        paranoid: false, // true로 설정하면 deletedAt 컬럼이 생긴다. 삭제시 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
        charset: "utf8mb4", //이모티콘까지 입력되게하려면 utf8mb4와 utf8mb4_general_ci오입력한다
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    //db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }

  // VARCHAR STRING
  // INT INTEGER
  // TINYINT BOOLEAN
  // DATETIME DATE
  // NOT NULL allowNull: false
  // UNIQUE unique:true
  // DEFAULT now() defalutValue:Sequelize.NOW
};