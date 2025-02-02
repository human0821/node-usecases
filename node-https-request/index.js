const https = require('node:https');
const fs = require('fs');

const fileMaxIndex = 50;
const getFileName = index => `h-${index}.jpg`;
const stages = {
  COPYING: "copying",
  COPIED: "copied"
}

const fileFetcher = index => {
  const fileName = getFileName(index);
  const options = {
    hostname: 'content.foto.my.mail.ru',
    port: 443,
    path: `/community/this_is_russia/_groupsphoto/${fileName}.jpg`,
    method: 'GET'
  };
  const req = https.request(options, res => {
    if (res.statusCode === 200) {
      console.log(stages.COPYING);
      const imageStream = fs.createWriteStream(`picchi/${fileName}`);
      res.on("error", () => imageStream.destroy());
      res.on("end", () => {
        console.log(stages.COPIED);
        imageStream.close();
        if (index < fileMaxIndex) {
          fileFetcher(index + 1);
        }
      });
      res.pipe(imageStream);
    }
    else if (res.statusCode === 403 || res.statusCode === 404) {
      fileFetcher(index + 1);
    }
  });
  req.on('error', e => console.error(e));
  req.end();
}

fileFetcher(1);