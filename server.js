const http = require('http');
 
const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
    response.statusCode = 200;

    const { method,url } = request;

    if(url === '/') {

        if(method === 'GET') {
            // curl -X GET http://localhost:5000
            response.end(JSON.stringify({
                message: 'ini adalah homepage'
            }));
        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }

    } else if(url === '/about') {

        if(method === 'GET') {
            // curl -X GET http://localhost:5000/about
            response.end(JSON.stringify({
                message: 'ini adalah halaman about'
            }))
        } else if(method === 'POST') {
            // curl -X POST http://localhost:5000/about
            // curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}"
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: `halaman ini tidak di temukan dengan ${method} request`,
            }));
        }
        
    } else {
        response.statusCode = 404;
        // curl -X <any> http://localhost:5000
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan',
        }));
    }
    


    // if(method == 'GET'){
    //     response.end('<h1>Hello!</h1>');
    // }

   
    // if(method === 'POST') {
    //     let body = [];
          
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });
       
    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //       });
    //   }

 };
 
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
