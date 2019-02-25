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
    database: 'kmm'
});
//allow custom header and CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

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

app.use(express.static('../index.html'));

// 搜索列表
app.get('/api/search', function(req, res) {
    let name = req.query.name;
    let age = req.query.age;
    let sqlSearch = "";
    let obj = {
        info: null,
        status: true,
        result: null
    }
    if (!!!name && !!!age) {
        sqlSearch = 'SELECT * FROM kmm_content';
    } else if (!!!name) {
        sqlSearch = `SELECT * FROM kmm_content WHERE age = '${age}'`
    } else if (!!!age) {
        sqlSearch = `SELECT * FROM kmm_content WHERE name LIKE '%${name}%'`;
    } else {
        sqlSearch = `SELECT * FROM kmm_content WHERE name LIKE '%${name}%' AND age = '${age}'`
    }
    connection.query(sqlSearch, function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        obj.info = 'search success';
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
    let addSqlParams = [name, psd];
    connection.query(`INSERT INTO chat_people (name, psd) VALUES (?, ?)`, addSqlParams, function(error, results, fields) {
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
});

// 登录
app.post('/api/login', function(req, res) {
    let name = req.body.name;
    let psd = req.body.psd;
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
    let addSqlParams = [name, psd];
    connection.query(`INSERT INTO chat_people (name, psd) VALUES (?, ?)`, addSqlParams, function(error, results, fields) {
        if (error) {
            obj.info = error.message;
            obj.status = false;
            return false;
        }
        obj.info = 'login success';
        obj.status = true;
        obj.result = results;
        res.send(obj);
        res.end();
    });
});

let count = 0;
io.on('connection', function (socket) {
  count++;
  console.log(count + ' user connected');
  console.log(socket.id);
  //断开事件
  socket.on('disconnect', function (data) {
    console.log('断开', data)
    socket.emit('chat message', '离开');
  })

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    socket.broadcast.emit('return message', msg);
    // socket.emit('return message', msg);
  });
});

http.listen(process.argv[2] || 3000, function () {
  // 默认使 http 服务器监听端口 3000
  console.log('listening on *:' + (process.argv[2] || 3000));
})
