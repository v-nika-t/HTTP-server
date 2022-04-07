const http = require('http');
const fs = require('fs');

const port = 3000;

const test = {'name':'Veronika', 'mail':'vt@mail.ru', 'password':'******'};

function sendDate(res, statusCode, Content_type, message) {
    res.statusCode = statusCode ;
    res.setHeader("Content-Type", Content_type);
    res.end(message);
};

const server = http.createServer( async(req, res) => {
    switch (req.method) {
        case "PUT":
            fs.writeFile('./users.json', JSON.stringify(test), (err) => {
                if(err) {
                    sendDate(res, 500, "text/plain", "File not found");
                } else { 
                    sendDate(res, 200, "text/plain", "Date re-wrote");
                }
            })
            break;
        case "GET":
            let getDate;
            if( fs.existsSync('./users.json') ) {
                getDate = fs.readFileSync('./users.json', (err, data) => {
                    return data;
                })
                sendDate(res, 500, "text/plain", await getDate.toString());

            } else {
                sendDate(res, 500, "text/plain", "File not found");
            }
            break;
        case "POST":
            fs.appendFile('./users.json', JSON.stringify(test), (err) => {
                if(err) {
                    sendDate(res, 500, "text/plain", "File not found");
                } else { 
                    sendDate(res, 200, "text/plain", "Date add");
                }
            })
            break;
    }


}).listen( port, 'localhost');