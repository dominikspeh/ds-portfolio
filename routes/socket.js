// SOCKET.IO

// implement crypto
var crypto = require('crypto');

// Codes
var socketCodes = {};


module.exports = function(socket) {

    socket.emit('pair:init', {});

    // pair smartphone and PC
    // Reference: http://blog.artlogic.com/2013/06/21/phone-to-browser-html5-gaming-using-node-js-and-socket-io/

    socket.on('pair:deviceType', function (data) {

        // if deviceType is 'desktop', generate a unique code and send to PC
        if (data.deviceType == 'desktop') {
            //console.log("Desktop");

            // generate code
            var code = random(4, "0123456789");


            // ensure code is unique
            while (code in socketCodes) {
                code = random(4, "0123456789");
            }

            // store code / socket assocation
            socketCodes[code] = this;
            socket.code = code;

            //console.log("Code:"+""+code);

            socket.emit('pair:sendCode', {code: code});


        }
        // if deviceType is 'smartphone', check if submitted code is valid and pair
        else if (data.deviceType == 'smartphone') {
            //console.log("Smartphone");

            socket.on('pair:getCode', function (data) {
                if (data.code in socketCodes) {
                    // save the code for mobile commands
                    socket.code = data.code;

                    // start mobile connection
                    socket.emit('pair:connected', {});

                    // start PC connection
                    socketCodes[data.code].emit('pair:connected', {});
                }
                else {
                    socket.emit('pair:fail', {});
                    //socket.disconnect();
                }
            });

        }
    });

    // User disconnect
    socket.on('disconnect', function () {
        //console.log('user disconnected');
        if (socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('disconnected', {});
            delete socketCodes[socket.code];
        }
    });

    // Success init
    socket.on('success:init', function () {
        if (socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('success:connected', {});
            socket.emit('success:connected', {});
        }
        else {
            socket.emit('connect:fail', {});
            console.log("error")
        }
    });

    // User to Home
    socket.on('home:init', function() {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('home:connected', {});
            socket.emit('home:connected',{});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });

    // User to About
    socket.on('about:init', function() {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('about:connected', {});
            socket.emit('about:connected',{});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });
    socket.on('fullpage:moveSection', function(data) {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('fullpage:moveToSection', {goToSection: data.goToSection});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });

    socket.on('about:skillInit', function(data) {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('about:changeSkills', {skill: data.skill});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });

    // User to Projects
    socket.on('projects:init', function() {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('projects:connected', {});
            socket.emit('projects:connected',{});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });

    socket.on('project:detailInit', function(data) {

        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('project:showDetail', {alias: data.alias});
            socket.emit('project:showDetail',{alias: data.alias});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });


    // User to Contact
    socket.on('contact:init', function() {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('contact:connected', {});
            socket.emit('contact:connected',{});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });

    socket.on('contact:deliverContent', function(data) {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('contact:content',
                {
                    name: data.name,
                    mail: data.mail,
                    message: data.message

                });
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });
    socket.once('contact:sendInit', function(data) {


        if(socket.code && socket.code in socketCodes) {
            console.log(data);
            socketCodes[socket.code].emit('contact:sendForm',{});
            socket.emit('contact:sendFormMobile',{});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });



    // EXTERNAL
    socket.on('externalLink:init', function(data) {
        if(socket.code && socket.code in socketCodes) {
            socketCodes[socket.code].emit('externalLink:connected', {url: data.url});
        }
        else {
            socket.emit('connect:fail',{});
            console.log("error");
        }
    });
};






// Generate Random Nummer with Crypto
function random (howMany, chars) {

    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    }

    return value.join('');
}