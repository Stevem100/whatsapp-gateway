// cPanel "Setup Node.js App" startup file.
// Passenger runs this file; it just boots the gateway.
process.chdir(__dirname);
require('./index.js');
