## 项目结构
│  app.js
│  package.json
│  README.md
│
├─.idea
│  │  express-project.iml
│  │  misc.xml
│  │  modules.xml
│  │  vcs.xml
│  │  watcherTasks.xml
│  │  workspace.xml
│  │
│  └─inspectionProfiles
├─bin
│      www
│
├─config 配置文件
│      db.json
│
├─dao
│      BaseDao.js
│      UserDao.js
│
├─models 实体层
│      user.js
│
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
│          style.css
│
├─routes  controller 层，写接口用
│      index.js
│      users.js
│
├─services 业务逻辑层
│      UserService.js
│
├─utils 创建型的方法或者其他公共方法
│      db-util.js
│
└─views
        error.jade
        index.jade
        layout.jade