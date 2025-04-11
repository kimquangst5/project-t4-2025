const fs = require("fs");

fs.copy("views", "dist/views")
  .then(() => console.log("Views success!"))
  .catch((err) => console.error(err));

fs.copy("views", "dist/views")
  .then(() => console.log("Views success!"))
  .catch((err) => console.error(err));
