var ListThemes = require('./list').default;

exports.handler = async (e) => {

  if (e.path === '/themes') {
    return ListThemes().then((themes) => {
      return {
        "statusCode": 200,
        "body": JSON.stringify(themes)
      };
    });
  }

};