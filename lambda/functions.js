function isAlexaHosted() {
    return process.env.S3_PERSISTENCE_BUCKET ? true : false;
}

function getPersistenceAdapter() {
    
    const tableName = "divierteTEA";
    
    if(isAlexaHosted()) {
        const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
        return new S3PersistenceAdapter({
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        });
    } else {
        const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
        return new DynamoDbPersistenceAdapter({
            tableName: tableName,
            createTable: false
        });
    }
}

function getQuestion(handlerInput, data, juego, nivel) {

    const min = 0;
    const max = data.length - 1;
    const aleatorio = Math.floor(Math.random()*(max - min) + min);
    const item = data[aleatorio];
    
    
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    sessionAttributes.Contador += 1;

    var question = '';
    
    if(nivel === 1) {
        if(juego === "animales"){
            console.log("NIVEL 1 ANIMALES OBTENER PREGUNTA");
            sessionAttributes.respuestaItem = item.Nombre;
            sessionAttributes.URL = item.Foto;
            question = requestAttributes.t("PREGUNTA_ANIMALES_N1", sessionAttributes.Contador, item.Sonido);
        } else {
            if (juego === "transportes") {
                console.log("NIVEL 1 TRANSPORTES OBTENER PREGUNTA");
                sessionAttributes.respuestaItem = item.Nombre;
                sessionAttributes.URL = item.Foto;
                question = requestAttributes.t("PREGUNTA_TRANSPORTES_N1", sessionAttributes.Contador, item.Sonido);
            } else {
                if(juego === "letras y numeros"){
                    console.log("NIVEL 1 LETRAS Y NUMEROS OBTENER PREGUNTA");
                    sessionAttributes.respuestaItem = item.Respuesta;
                    sessionAttributes.URL = item.Foto;
                    sessionAttributes.Pregunta = item.Pregunta;
                    sessionAttributes.Digito = item.Nombre;
                    question = requestAttributes.t("PREGUNTA_LYN_N1", sessionAttributes.Contador, item.Pregunta, item.Nombre);
                }
            }
        }
    } else {
        if(juego === "animales") {
            console.log("NIVEL 2 ANIMALES OBTENER PREGUNTA");
            sessionAttributes.respuestaItem = item.Colectivo;
            sessionAttributes.URL = item.FotoCol;
            question = requestAttributes.t("PREGUNTA_ANIMALES_N2", sessionAttributes.Contador, item.Genero, item.Nombre);
        } else {
            if(juego === "transportes") {
                console.log("NIVEL 2 ANIMALES OBTENER PREGUNTA");
                sessionAttributes.respuestaItem = item.Medio;
                sessionAttributes.URL = item.Foto;
                question = requestAttributes.t("PREGUNTA_TRANSPORTES_N2", sessionAttributes.Contador, item.Genero, item.Nombre);
            } else {
                console.log("NIVEL 2 LETRAS Y NUMEROS OBTENER PREGUNTA");
                sessionAttributes.respuestaItem = item.Respuesta;
                sessionAttributes.URL = item.Foto;
                sessionAttributes.Pregunta = item.Pregunta;
                sessionAttributes.Digito = item.Nombre;
                question = requestAttributes.t("PREGUNTA_LYN_N2", sessionAttributes.Contador, item.Pregunta, item.Nombre);
            }
        }
    }
    
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    return question;
}

function comparaRespuesta(slots, value) {
    console.log("ESTOY EN LA FUNCION comparaRespuesta");
    for (const slot in slots) {
        if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
            console.log(slots[slot].value.toString().toLowerCase());
            console.log(slots[slot].value.toString().toLowerCase() === value.toString().toLowerCase());
            if (slots[slot].value.toString().toLowerCase() === value.toString().toLowerCase()) {
                return true;
            }
        }
    }
    return false;
}

function getMedalla() {
    
}

function getPuntos() {
    
}

module.exports = {
    isAlexaHosted,
    getPersistenceAdapter,
    getQuestion,
    comparaRespuesta
}