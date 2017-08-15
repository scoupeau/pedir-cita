//https://developers.google.com/google-apps/calendar/quickstart/nodejs
//LDVM
// una opcion seria sacar un formulario para el paciente que lo rellene, chequear el calendario
// y si está libre crear una cita
// Para hacerlo con un bot y api.ai los pasos serían: https://github.com/RaphaelMeudec/API.AI-FacebookMessenger
// 1.- crear el agente, intents... en api.ai 
// 2.- crear un node.js local donde crear la llamada a la api de google calendar y chequear si hay hora libre en la fecha que quiere el paciente
// 3.- si hay hora libre crear un evento en el calendario de la clinica y enviar un email a la clinica y al solicitante
// 4.- si no hay hora libre buscar la siguiente libre y proponer la cita a ambas partes
// cosillas: se pueden crear "espacios para citas en google calendar" https://support.google.com/calendar/answer/190998?hl=es
// EN PHP http://qbit.com.mx/blog/2015/06/19/usando-el-api-de-google-calendar/

'use strict';
// restify lee el formato JSON que me da api.ai
const Restify = require('restify');
const server = Restify.createServer({
  name: "PedirCita"
});
const request = require('request');
const PORT = process.env.PORT || 3000;
//const proximascitas = require('./quickstart');
// necesitamos leer el json de api.ai
server.use(Restify.bodyParser());
server.use(Restify.jsonp());

//antes de ir a recuperar el calendario tenemos que get dia y hora solicitadas por el bot

var horaCita = (new Date()).getHours();
var diaCita = (new Date()).getDate();

// POST route handler 
//supongo que POST es para pedir o preguntar a api.ai (a traves del webhook ngrok) por el json con el intent, etc
// req.body contiene el payload de api.ai con los intent y las entities y se lo preguntamos
server.post('/', (req, res, next) => {
   let {
    status,
    result
  } = req.body;
  //status 200 es guay. console.log("status y result" + status+result);
 

  let {
    date,
    hora,
    profesional,
    paciente,
    telefono,
    lugar_cita
  } = result.parameters;

diaCita = date;
horaCita = hora;
//console.log(diaCita+horaCita+profesional+lugar_cita+paciente);

console.log(result);
  //console.log(res.json({status,result}));

if(status.code === 200 && res.action === 'cita') {
    const {
      nombre,
      apellidos,
      profesional,
      date,
      hora,
      paciente,
      lugar_cita,
      telefono  
    } = result.parameters;

   
   /*// esta parte es para la autenticacion de google
    var fs = require('fs');
    var readline = require('readline');
    var google = require('googleapis');
    var googleAuth = require('google-auth-library');
    //
    var calendar = google.calendar('v3');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// cambiar el scope
// borrar search-ms:displayname=Resultados%20de%20la%20búsqueda%20en%20Disco%20local%20(C%3A)&crumb=location:C%3A%5C\.credentials
//var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  var SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/calendar/v3'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
     process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  //var auth ='AIzaSyC4wOLoYaTUkeDE6Y1wlao3hs0QZI9tcFU';

  //authorize(JSON.parse(content), CreaEvento);
 
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
  // crea un evento
  //authorize(JSON.parse(content), CreaEvento);
   
});*/
}


   if(result) {
            res.json({
              speech: result,
              displayText: result,
              source: "PedirCita"
            });
          }
    
  return next();
});

server.listen(PORT, () => console.log(`PedirCita bot running on ${PORT}`));

  // esta parte es para la autenticacion de google
    var fs = require('fs');
    var readline = require('readline');
    var google = require('googleapis');
    var googleAuth = require('google-auth-library');
    //
   var calendar = google.calendar('v3');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// cambiar el scope
// borrar search-ms:displayname=Resultados%20de%20la%20búsqueda%20en%20Disco%20local%20(C%3A)&crumb=location:C%3A%5C\.credentials
//var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  var SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/calendar/v3'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
     process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  //var auth ='AIzaSyC4wOLoYaTUkeDE6Y1wlao3hs0QZI9tcFU';

  //authorize(JSON.parse(content), CreaEvento);
 
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
  // crea un evento
  //authorize(JSON.parse(content), CreaEvento(result));

});
 
// POST route handler 
//supongo que POST es para pedir o preguntar a api.ai (a traves del webhook ngrok) por el json con el intent, etc
// req.body contiene el payload de api.ai con los intent y las entities y se lo preguntamos

/*const cita = (reserva, telef, cb) => {
  const {
    fecha,
    telefono
  } = reserva;
 return request({
    url: "https://apidata.googleusercontent.com/caldav/v2/scoupeau@gmail.com/user",
    qs: {
      fecha: timeMin,
      hora: timeMax,
      //profesional: Profesional,
      paciente: q,
     // telefono: telefono
    },
    method: 'GET',
    json: true 
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      cb(null, `cita ${fecha} ${hora} ${profesional} ${paciente}  ${paciente} `);
    } else {
      cb(error, null);
    }
  });*/




/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Autoriza a esta App yendo a esta URL: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


// vamos a interrogar a la api calendar de google a ver si podemos crear una cita en mi calendar
// https://developers.google.com/google-apps/calendar/quickstart/nodejs
//https://developers.google.com/google-apps/calendar/v3/reference/events/insert
/*
para saber si esta libre una fecha y hora hay esto
https://developers.google.com/google-apps/calendar/v3/reference/freebusy/query#try-it
*/
function fechahoralibre(auth)
{
  /*
  la peticion (request) tiene que tener este formato
  {
  "timeMin": '2017-08-28T09:00:00-07:00',
  "timeMax": '2017-08-28T10:00:00-07:00',
  "timeZone": 'Europe/Madrid',
  "groupExpansionMax": 1,
  "calendarExpansionMax": 1,
  "items": [
    {
      "id": 'scoupeau@gmail.com'
    }
  ]
}
  */
  /* y esto es la response
  "kind": "calendar#freeBusy",
  "timeMin": datetime,
  "timeMax": datetime,
  "groups": {
    (key): {
      "errors": [
        {
          "domain": string,
          "reason": string
        }
      ],
      "calendars": [
        string
      ]
    }
  },
  "calendars": {
    (key): {
      "errors": [
        {
          "domain": string,
          "reason": string
        }
      ],
      "busy": [
        {
          "start": datetime,
          "end": datetime
        }
      ]
    }
  }

¿Cómo extraer de este JSON las fechas y horas ocupadas?
*/
};
/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  //scb var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 15,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No he encontrado Citas pendientes.');
    } else {
      console.log('La lista de las  próximas citas:');
      
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        var dia = event.start.date;
        var hora = event.start.time;
        if (diaCita === dia && horaCita === hora) {
        console.log("dia"+dia+" y hora "+hora+"ya reservados");
      };
        console.log('%s - %s', start, event.summary);
       
      }
    }
  });
}
function CreaEvento(auth,result) {
var event = {
  'summary': result.paciente,
  'location': result.lugar_cita,
  'description': result.nombre + ' '+ result.apellidos,
  'start': {
    'dateTime': result.date+result.hora, /*'2017-08-28T09:00:00-07:00',*/
    'timeZone': 'Europe/Madrid',
  },
  'end': {
    'dateTime': result.date+(result.hora+=1),
    'timeZone': 'Europe/Madrid',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'scoupeau@gmail.com'},
    {'email': 'jaimecrcl@gmail.com'},
  ],
  'reminders':
    {'useDefault': false,
     'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
    },
};

calendar.events.insert({
  auth: auth,
  //calendarId: 'primary',
  calendarId: 'scoupeau@gmail.com',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('Ha habido un error al tratar de conectar con el servicio Calendar de google: ' + err);
    return;
  }
  console.log('Evento creado: %s', event.htmlLink);
});
};
exports.CreaEvento=CreaEvento;
exports.authorize=authorize;
exports.listEvents=listEvents;

// result es un objeto que tiene parametros con los valores de las entidades. El json de api.ai es:
  /*
  {
  "id": "d71da89c-26d2-45bc-9ffc-457e096bc5ae",
  "timestamp": "2017-08-13T15:39:58.019Z",
  "lang": "es",
  "result": {
    "source": "agent",
    "resolvedQuery": "Me llamo kevin mago, quiero consulta con la dra. lucia del val para el jueves 20 a las 12h en la clinica para pepe dominguez. mi telefono es 677899344",
    "action": "cita",
    "actionIncomplete": false,
    "parameters": {
      "apellidos": "mago",
      "date": [
        "2017-08-17"
      ],
      "hora": [
        "12:00:00"
      ],
      "lugar_cita": [
        "clinica"
      ],
      "nombre": "kevin",
      "paciente": [
        "pepe dominguez"
      ],
      "phone-number": [
        "677899344"
      ],
      "profesional": [
        "lucia del val"
      ]
    },
    "contexts": [],
    "metadata": {
      "intentId": "12129bbc-b10c-487e-8584-4e72522dc5e3",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "intentName": "Pedir-Cita"
    },
    "fulfillment": {
      "speech": "Recuerda que lo más rápido para solicitar cita es indicar 1.-tu nombre y apellido, 2.-a qué doctor quieres ver, 3.-cuándo (fecha y hora), 4.-paciente, 5.-dónde (en la Clinica o a domicilio) y 6.- Indica un teléfono de contacto. Gracias",
      "messages": [
        {
          "type": 0,
          "speech": "Recuerda que lo más rápido para solicitar cita es indicar 1.-tu nombre y apellido, 2.-a qué doctor quieres ver, 3.-cuándo (fecha y hora), 4.-paciente, 5.-dónde (en la Clinica o a domicilio) y 6.- Indica un teléfono de contacto. Gracias"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 206,
    "errorType": "partial_content",
    "errorDetails": "Webhook call failed. Error: 404 Not Found"
  },
  "sessionId": "d882fd60-4680-4615-a401-3e2b05a1958a"
}
*/
