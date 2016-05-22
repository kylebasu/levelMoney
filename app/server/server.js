var express = require('express');

app = express();
app.use(express.static('app/client'));

app.listen(1337);