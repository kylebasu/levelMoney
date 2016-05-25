## Instructions
Pre: I assume that both Node and NPM are install on your machine.b
1. From the root directory run: $ npm install
2. From the root directory run: $ cd app/client <- This will take you to the client directory in order to install bower components
3. From the client directory run: $ bower install
4. From the client directory run: $ cd ../.. < This will take you to the root directory
5. From the root directory run: $ node app/server/server.js
6. In your browser, navigate to: localhost:1337