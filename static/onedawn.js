/*
 * with dependency of jquery
 */

var onedawn;

console.log("onedawn-client-lib v0.1.0");

function onedawn_connect() {  // 掉线或者服务器主动关闭连接，都需要调用此函数重启
    let url = location.protocol + '//' + document.domain + ':' + location.port + '/';
    onedawn.socketio = io.connect(url);
}

function onedawn_init() {
    onedawn = {
        "socketio": null,
        "user_info": null
    };
    onedawn_connect();
    onedawn.socketio.on('connect', function(socket) {
        console.log('onedawn connected to server');
        console.log(onedawn.socketio);
    });
    onedawn.socketio.on('disconnect', function(socket) {
        console.error('onedawn disconnect from server');
    });
    onedawn.socketio.on('err', function(err) {
        console.error(err);
    });
    onedawn.socketio.on('user_info', function(user_info) {
        onedawn.user_info = user_info;
        console.log(user_info);
    });
}

function onedawn_clear(name) {  // 删除一个callback
    if (onedawn && onedawn.socketio._callbacks[name]) {
        delete onedawn.socketio._callbacks[name];
    }
}

function onedawn_on(name, func) {
    onedawn.socketio.on(name, func);
}

function onedawn_emit(name, val) {
    onedawn.socketio.emit(name, val);
}

function onedawn_imglist(html) {  // 由于图文消息需要下载图片，筛选全部的图片链接
    // console.log("onedawn_imglist not implemented");
}

// function onedawn_img2base64(img, callback) {
//     let canvas = document.createElement("canvas");
//     let ctx = canvas.getContext('2d');
//     console.log(img);
//     canvas.height = img.height;
//     canvas.width = img.width;
//     console.log(img.height);
//     console.log(img.width);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     let dataURL = canvas.toDataURL();
//     img.src = dataURL
//     console.log(img)
//     // callback(dataURL);
// }
