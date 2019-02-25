let express = require('express');
let app = express();
let http = require('http').Server(app);
let mysql = require('mysql')
let io = require('socket.io')(http);
// 数据库的配置
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'chat'
});
//allow custom header and CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log(req.method)
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

let bodyParser = require("body-parser");
// 加上这一行才可以获取post方式传来的参数
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('../dist'));

// 聊天内容
app.get('/api/chat', function(req, res) {
    let obj = {
        info: null,
        status: true,
        result: null
    }
    connection.query('SELECT * FROM chat_content', function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        obj.info = 'chat success';
        obj.status = true;
        obj.result = results;
        res.send(obj);
        res.end();
    });
});

// 写入聊天内容
app.post('/api/chat_insert', function(req, res) {
    let name = req.body.name;
    let people_id = req.body.people_id;
    let content = req.body.content;
    let chat_time = req.body.chat_time;
    let obj = {
        info: null,
        status: true,
        result: null
    }
    if (!!!name) {
        obj.info = '缺失参数name';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    if (!!!people_id) {
        obj.info = '缺失参数people_id';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    if (!!!content) {
        obj.info = '缺失参数content';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    if (!!!chat_time) {
        obj.info = '缺失参数chat_time';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    let addSqlParams = [name, people_id, content, chat_time]
    connection.query(`INSERT INTO chat_content (name, people_id, content, chat_time) VALUES (?, ?, ?, ?)`, addSqlParams, function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        obj.info = 'chat_insert success';
        obj.status = true;
        obj.result = results;
        res.send(obj);
        res.end();
    });
});

// 注册
app.post('/api/sign', function(req, res) {
    let name = req.body.name;
    let psd = req.body.psd;
    let sign_time = req.body.sign_time;
    let obj = {
        info: null,
        status: true,
        result: null
    }
    if (!!!name) {
        obj.info = '缺失参数name';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    if (!!!psd) {
        obj.info = '缺失参数psd';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    let addSqlParams = [name, psd, sign_time];
    connection.query(`SELECT * FROM chat_people WHERE NAME='${name}'`, function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        if(results.length == 0){
            connection.query(`INSERT INTO chat_people (name, psd, sign_time) VALUES (?, ?, ?)`, addSqlParams, function(error, results, fields) {
                if (error) {
                    obj.info = error.message;
                    obj.status = false;
                    return false;
                }
                obj.info = 'sign success';
                obj.status = true;
                obj.result = results;
                res.send(obj);
                res.end();
            });
        }else{
            obj.info = '用户已注册';
            obj.status = false;
            obj.result = results;
            res.send(obj);
            res.end();
        }
    });
});

// 登录
app.post('/api/login', function(req, res) {
    let name = req.body.name;
    let psd = req.body.psd;
    let login_time = req.body.login_time;
    let obj = {
        info: null,
        status: true,
        result: null
    }
    if (!!!name) {
        obj.info = '缺失参数name';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    if (!!!psd) {
        obj.info = '缺失参数psd';
        obj.status = false;
        res.send(obj);
        res.end();
        return false
    }
    connection.query(`SELECT * FROM chat_people WHERE NAME='${name}'`, function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        if(results.length == 0){
            obj.info = '未检测到此用户';
            obj.status = false;
            obj.result = results;
            res.send(obj);
            res.end();
        }else{
            connection.query(`SELECT * FROM chat_people WHERE NAME='${name}' AND PSD='${psd}'`, function(error, results, fields) {
                if (error) {
                    obj.info = error.message;
                    obj.status = false;
                    return false;
                }
                if(results.length == 0){
                    obj.info = '密码错误';
                    obj.status = false;
                    obj.result = results;
                    res.send(obj);
                    res.end();
                }else{
                    obj.result = results;
                    let addSqlParams = [login_time, name];
                    connection.query(`UPDATE chat_people SET login_time = ? WHERE NAME = ?`, addSqlParams, function(error, results, fields) {
                        if (error) {
                            obj.info = error.message;
                            obj.status = false;
                            return false;
                        }
                        obj.info = 'login success';
                        obj.status = true;
                        res.send(obj);
                        res.end();
                    });
                }
            });
        }
    });
});

let count = 0;
io.on('connection', function (socket) {
  //断开事件
  socket.on('disconnect', function (data) {
    console.log('断开', data)
    socket.emit('chat message', '离开');
  })

  socket.on('chat message', function (msg) {
    socket.broadcast.emit('return message', msg);
  });
});

http.listen(process.argv[2] || 3000, function () {
  // 默认使 http 服务器监听端口 3000
  console.log('listening on *:' + (process.argv[2] || 3000));
})
