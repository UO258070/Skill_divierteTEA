const Alexa = require('ask-sdk-core');

const interceptor = require('./interceptor');
const languageStrings = require('./localisation');
const functions = require('./functions');
const persistenceAdapter = functions.getPersistenceAdapter();
const data = require('./data');


//El usuario invoca la Skill sin proporcionar una acción en concreto
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        console.log("INICIO");
        const {attributesManager} = handlerInput; // === attributesManager = handlerInput.attributesManager
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        console.log(sessionAttributes);

        const animalesAciertos = sessionAttributes['animalesAciertos'];
        const animalesFallos = sessionAttributes['animalesFallos'];
        const transportesAciertos = sessionAttributes['transportesAciertos'];
        const transportesFallos = sessionAttributes['transportesFallos'];
        const lynAciertos = sessionAttributes['lynAciertos'];
        const lynFallos = sessionAttributes['lynFallos'];
        
        
        if(animalesAciertos === null && animalesFallos === null && transportesAciertos === null && transportesFallos === null && lynAciertos === null && lynFallos === null) {
            sessionAttributes['animalesAciertos'] = 0;
            sessionAttributes['animalesFallos'] = 0;
            sessionAttributes['transportesAciertos'] = 0;
            sessionAttributes['transportesFallos'] = 0;
            sessionAttributes['lynAciertos'] = 0;
            sessionAttributes['lynFallos'] = 0;
            attributesManager.setSessionAttributes(sessionAttributes);
        }
        
        sessionAttributes['Contador'] = 0;
        sessionAttributes['puntos'] = 0;
        console.log(sessionAttributes);
        
        // Se comprueba si soporta interfaces
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("SOPORTA APL");

            const documentName = "Inicio"; // Name of the document saved in the authoring tool
            const token = documentName + "Token";

            // Add the RenderDocument directive to the response
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: token,
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "headlineTemplateData": {
                        "type": "object",
                        "objectId": "headlineSample",
                        "properties": {
                            "backgroundImage": {
                                "contentDescription": null,
                                "smallSourceUrl": null,
                                "largeSourceUrl": null,
                                "sources": [
                                    {
                                        "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                        "size": "large"
                                    }
                                ]
                            },
                            "textContent": {
                                "primaryText": {
                                    "type": "PlainText",
                                    "text": "Bienvenido a divierteTEA"
                                }
                            },
                            "hintText": "Prueba a decir tu nombre"
                        }
                    }
                }
            });
        }
        
        const speakOutput = requestAttributes.t("WELCOME_MSG") + requestAttributes.t("NAME_MSG");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("NAME_MSG")
            .withStandardCard("BIENVENIDO A divierteTEA", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
            .getResponse();
    }
};

/* 
* Opción de utilizar o no pantalla, excepto cuando no soporta interfaces. 
* Se invoca cuando el usuario dice su nombre 
*/
const OpcionPantallaIntentHandler = {
    
    canHandle(handlerInput) {
        console.log("OPCION_PANTALLA_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OpcionPantallaIntent';
    },
    handle(handlerInput) {
        console.log("prueba1");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const nombreUsuario = intent.slots.nombre.value;
        sessionAttributes['nombreUsuario'] = nombreUsuario;
        attributesManager.setSessionAttributes(sessionAttributes);
        console.log(sessionAttributes);
        
        var speakOutput = ``;

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            // Soporta interfaces, por lo que se da la opcion al usuario de utilizar la pantalla
            console.log("SOPORTA APL");

            const documentName = "opcionPantalla"; // Name of the document saved in the authoring tool
            const token = documentName + "Token";

            // Add the RenderDocument directive to the response
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: token,
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "imageTemplateData": {
                        "type": "object",
                        "objectId": "imageSample",
                        "properties": {
                            "backgroundImage": {
                                "contentDescription": null,
                                "smallSourceUrl": null,
                                "largeSourceUrl": null,
                                "sources": [
                                    {
                                        "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                        "size": "large"
                                    }
                                ]
                            },
                            "image": {
                                "contentDescription": null,
                                "smallSourceUrl": null,
                                "largeSourceUrl": null,
                                "sources": [
                                    {
                                        "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/OpcionPantalla.png",
                                        "size": "large"
                                    }
                                ]
                            },
                            "title": "¿QUIERES JUGAR CON PANTALLA O SOLO CON SONIDOS?"
                        }
                    }
                }
            });
            
            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PANTALLA_MSG");
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withStandardCard("BIENVENIDO A divierteTEA", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                .reprompt(speakOutput)
                .getResponse();
            
        } else {
            // No soporta APL, por lo tanto no se da a escoger la opción de utilizar la pantalla 
            
            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};

/* 
* Juegos que el usuario puede jugar. 
* Se invoca cuando el usuario escoge entre usar o no pantalla 
*/
const PreguntaJuegoIntentHandler = {
    canHandle(handlerInput) {
        console.log("PREGUNTA_JUEGO_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PreguntaJuegoIntent';
    },
    handle(handlerInput) {
        console.log("pruebaNombreJuego");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        
        const pantalla = intent.slots.pantalla.value;
        
        sessionAttributes['pantalla'] = pantalla;
        attributesManager.setSessionAttributes(sessionAttributes);

        var speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG");
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){ // El dispositivo soporta interfaces
            
            console.log("SOPORTA APL");
            
            if(sessionAttributes.pantalla === "pantalla") { // El usuario quiere usar la pantalla
                
                const documentName = "menuJuegos"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";

                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "menuJuegosDataSource": {
                            "type": "object",
                            "objectId": "imageListSample",
                            "backgroundImage": {
                                "contentDescription": null,
                                "smallSourceUrl": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                "largeSourceUrl": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                "sources": [
                                    {
                                        "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                        "size": "large"
                                    }
                                ]
                            },
                            "title": "",
                            "listItems": [
                                {
                                    "primaryText": "Animales",
                                    "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/inicio.jpg",
                                    "primaryAction": [
                                        {
                                            "type": "SetValue",
                                            "componentId": "menu",
                                            "property": "headerTitle",
                                            "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                        }
                                    ]
                                },
                                {
                                    "primaryText": "Transportes",
                                    "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/transportes.png",
                                    "primaryAction": [
                                        {
                                            "type": "SetValue",
                                            "componentId": "menu",
                                            "property": "headerTitle",
                                            "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                        }
                                    ]
                                },
                                 {
                                    "primaryText": "Letras y números",
                                    "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/letrasynumeros.jpg",
                                    "primaryAction": [
                                        {
                                            "type": "SetValue",
                                            "componentId": "menu",
                                            "property": "headerTitle",
                                            "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                        }
                                    ]
                                }
                            ],
                            "hintText": "Di \"Animales\""
                        }
                    }
                });
                
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard("¿Qué juego quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/inicio.jpg", "https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/transportes.png", "https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/letrasynumeros.jpg")
                    .reprompt(speakOutput)
                    .getResponse();
            
            } 
            
            else { // El usuario no quiere usar la pantalla
                
                console.log("Usuario no quiere pantalla");

                const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";

                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: { 
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                });
                
                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
                
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                    .reprompt(speakOutput)
                    .getResponse();
            }
        } 
        
        else { // El dispositivo no soporta interfaces
            
            console.log("NO SOPORTA APL");
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
};

/* 
* El usuario escoge el nivel que quiere (1 o 2). 
* Se invoca cuando el usuario escoger el juego
*/
const NivelIntentHandler = {
    canHandle(handlerInput) {
        console.log("NIVEL_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NivelIntent';
    },
    
    handle(handlerInput) {
        console.log("pruebaNivel");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const NombreJuego = intent.slots.juego.value;
        sessionAttributes['NombreJuego'] = NombreJuego;
        attributesManager.setSessionAttributes(sessionAttributes);
        console.log(sessionAttributes);
        
        console.log("NIVELES CON PANTALLA Y SIN PANTALLA");
        var speakOutput = ``;
        

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){ // El dispositivo soporta interfaces
        
            if(sessionAttributes.NombreJuego === "animales"){
                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_SONIDO_NIVELES");
                if(sessionAttributes.pantalla === "pantalla") {
                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_PANTALLA_NIVELES");
                }
            } 
            else {
                if(sessionAttributes.NombreJuego === "transportes"){
                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_SONIDO_NIVELES");
                    if(sessionAttributes.pantalla === "pantalla") {
                        speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_PANTALLA_NIVELES");
                    }
                }
                else {
                    if(sessionAttributes.NombreJuego === "letras y numeros"){
                        speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("LYN_NIVELES");
                        if(sessionAttributes.pantalla === "sonidos") {
                            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("JUEGO_NO_DISPONIBLE_MODALIDAD") + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
                        }
                    }
                    else {
                        speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("JUEGO_NO_DISPONIBLE") + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
                    }
                }
            }
            
            if(sessionAttributes.pantalla === "pantalla") { // El usuario quiere usar la pantalla
                
                const documentName = "niveles"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";

                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "imageTemplateData": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/niveles.png",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": "¿QUÉ NIVEL QUIERES?"
                            }
                        }
                    }
                });
                
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard("¿Qué nivel quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/niveles.png")
                    .reprompt(speakOutput)
                    .getResponse();
            
            } 
            
            else {
                
                const documentName = "soloSonido";
                const token = documentName + "Token";

                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: { 
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }); 
            }
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .withStandardCard("¿Qué nivel quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                .getResponse();
        }
        
        else {
            
            if(sessionAttributes.NombreJuego === "animales"){
                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_SONIDO_NIVELES");
            }
            else {
                if(sessionAttributes.NombreJuego === "transportes"){
                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_SONIDO_NIVELES");
                }
                else {
                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("JUEGO_NO_DISPONIBLE_MODALIDAD");
                }
            }
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};

/*
* Se le hace una pregunta al usuario en función del juego, nivel y modalidad escogido previamente.
* Se invoca cuando el usuario escoge el nivel
*/
const PreguntasIntentHandler = {
    canHandle(handlerInput) {
        console.log("PREGUNTA_ANIMALES_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PreguntasIntent';
    },
    
    handle(handlerInput) {
        console.log("Animales preguntas");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const nivelJuego = intent.slots.nivel.value;
        sessionAttributes['Nivel'] = nivelJuego;
        attributesManager.setSessionAttributes(sessionAttributes);
        
        var question = ``;
        var intro = ``;
        var speakOutput = ``;
        var title = "";
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            if(sessionAttributes.NombreJuego === "animales"){
                if(sessionAttributes.pantalla === "sonidos") { // El usuario no quiere utilizar la pantalla
                    
                    if(sessionAttributes.Nivel === "1") {
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                        intro = requestAttributes.t("INTRO_ANIMALES_N1", sessionAttributes.nombreUsuario);
                        
                    } else {
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                        intro = requestAttributes.t("INTRO_ANIMALES_N2", sessionAttributes.nombreUsuario);
                    }
                    
                    speakOutput = intro + question;
                        
                    const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: { 
                            "headlineTemplateData": {
                                "type": "object",
                                "objectId": "headlineSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                        .reprompt(question)
                        .getResponse();
                    
                }
                else { // El usuario ha escogido utilizar la pantalla
                    
                    if(sessionAttributes.Nivel === "1") {
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                        intro = requestAttributes.t("INTRO_ANIMALES_N1", sessionAttributes.nombreUsuario);
                        attributesManager.setSessionAttributes(sessionAttributes);
                        title = "¿QUÉ ANIMAL ES ESTE?";
                        
                    } else {
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                        intro = requestAttributes.t("INTRO_ANIMALES_N2", sessionAttributes.nombreUsuario);
                        title = "¿CUÁL ES EL COLECTIVO DE ESTE ANIMAL?"
                    }
                    
                    speakOutput = intro + question;
                   
                    const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                            datasources: {
                            "FotosDataSource": {
                                "type": "object",
                                "objectId": "imageSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    },
                                    "image": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": sessionAttributes.URL,
                                                "size": "large"
                                            }
                                        ]
                                    },
                                    "title": title
                                }
                            }
                        }
                    });
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard(title, "", sessionAttributes.URL)
                        .reprompt(question)
                        .getResponse();
                }
            } 
            
            if (sessionAttributes.NombreJuego === "transportes") {
                
                if(sessionAttributes.pantalla === "sonidos") { // El usuario no quiere utilizar la pantalla
                    
                    if(sessionAttributes.Nivel === "1") {
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                        intro = requestAttributes.t("INTRO_TRANSPORTES_N1", sessionAttributes.nombreUsuario);
                        
                    } else {
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                        intro = requestAttributes.t("INTRO_TRANSPORTES_N2", sessionAttributes.nombreUsuario);
                    }
                    
                    speakOutput = intro + question;
                        
                    const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: { 
                            "headlineTemplateData": {
                                "type": "object",
                                "objectId": "headlineSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                        .reprompt(question)
                        .getResponse();
                    
                }
                else { // El usuario ha escogido utilizar la pantalla
                    
                    if(sessionAttributes.Nivel === "1") {
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                        intro = requestAttributes.t("INTRO_TRANSPORTES_N1", sessionAttributes.nombreUsuario);
                        attributesManager.setSessionAttributes(sessionAttributes);
                        title = "¿QUÉ TRANSPORTE ES ESTE?";
                        
                    } else {
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                        intro = requestAttributes.t("INTRO_TRANSPORTES_N2", sessionAttributes.nombreUsuario);
                        title = "¿POR QUÉ MEDIO VA ESTE TRANSPORTE?";
                    }
                    
                    speakOutput = intro + question;
                    console.log(sessionAttributes.URL);
                    
                    const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                            datasources: {
                            "FotosDataSource": {
                                "type": "object",
                                "objectId": "imageSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    },
                                    "image": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": sessionAttributes.URL,
                                                "size": "large"
                                            }
                                        ]
                                    },
                                    "title": title
                                }
                            }
                        }
                    });
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard(title, "", sessionAttributes.URL)
                        .reprompt(question)
                        .getResponse();
                }
            }
            
            if (sessionAttributes.NombreJuego === "letras y numeros"){
               
                console.log("LETRAS Y NUMEROS");
                if(sessionAttributes.Nivel === "1") {
                    console.log("LETRAS Y NUMEROS N1, nivel: " + sessionAttributes.Nivel)
                    question = functions.getQuestion(handlerInput, data.lyn_N1, sessionAttributes.NombreJuego, 1);
                    intro = requestAttributes.t("INTRO_LYN_N1", sessionAttributes.nombreUsuario);
                    attributesManager.setSessionAttributes(sessionAttributes);
                    title = "¿" + sessionAttributes.Pregunta + " '" + sessionAttributes.Digito + "' " + "HAY?";
                    
                } else {
                    question = functions.getQuestion(handlerInput, data.lyn_N2, sessionAttributes.NombreJuego, 2);
                    intro = requestAttributes.t("INTRO_LYN_N2", sessionAttributes.nombreUsuario);
                    title = "¿" + sessionAttributes.Pregunta + " " +sessionAttributes.Digito + " HAY?";
                }
                
                speakOutput = intro + question;
                   
                const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";
        
                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                        datasources: {
                        "FotosDataSource": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": sessionAttributes.URL,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": title
                            }
                        }
                    }
                });
                    
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard(title, "", sessionAttributes.URL)
                    .reprompt(question)
                    .getResponse();
            }
            
        } else { // El dispositivo no soporta interfaces
            
            if(sessionAttributes.NombreJuego === "animales"){
                
                if(sessionAttributes.Nivel === "1") {
                    question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                    intro = requestAttributes.t("INTRO_ANIMALES_N1", sessionAttributes.nombreUsuario);
                        
                } else {
                    question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                    intro = requestAttributes.t("INTRO_ANIMALES_N2", sessionAttributes.nombreUsuario);
                }
                
                speakOutput = intro + question;
                
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(question)
                    .getResponse();
            }
            
            if(sessionAttributes.NombreJuego === "transportes"){
                
                if(sessionAttributes.Nivel === "1") {
                    question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                    intro = requestAttributes.t("INTRO_TRANSPORTES_N1", sessionAttributes.nombreUsuario);
                        
                } else {
                    question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                    intro = requestAttributes.t("INTRO_TRANSPORTES_N2", sessionAttributes.nombreUsuario);
                }
                
                speakOutput = intro + question;
                
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(question)
                    .getResponse();
            }
        }
    }
};

/*
* Se invoca cuando el usuario contesta a la pregunta realizada para el juego Animales.
* Si se han realizado menos de 3 preguntas: Si la respuesta es correcta, emite sonido acierto y sigue preguntando. Si la respuesta es incorrecta, emite sonido fallo y sigue preguntando.
* Si se han realizado 3 preguntas: Indica los puntos obtenidos y las posibles acciones a realizar.
*/
const RespuestaAnimalesIntentHandler = {
    canHandle(handlerInput) {
        console.log("RESPUESTA_ANIMALES_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RespuestaAnimalesIntent';
    },
    
    handle(handlerInput) {
        console.log("Animales respuestas");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        var question = ``;
        var speakOutput = ``;
        var respCorrecta = false;
        var correccion = ``;
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            var medalla = "";
            var title = "";
            var subtitle = "";
            
            if(sessionAttributes.Nivel === "1") {
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.nombreAnimal: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                
                if(respCorrecta){
                    sessionAttributes.puntos += 1;
                    attributesManager.setSessionAttributes(sessionAttributes);
                    
                    sessionAttributes.animalesAciertos += 1;
                    
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                } 
                else {
                    sessionAttributes.animalesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                if(sessionAttributes.Contador < 3) { // No se han hecho todas las preguntas
                    
                    if(sessionAttributes.pantalla === "sonidos") { // El usuario no quiere utilizar pantalla
                        
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                        speakOutput = correccion + question;
                    
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt(question)
                            .getResponse();
                    
                    // Usuario quiere pantalla 
                    } else { // El usuario ha elegido utilizar pantalla
                        
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                        speakOutput = correccion + question;
                        title = "¿QUÉ ANIMAL ES ESTE?";

                        const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "FotosDataSource": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": sessionAttributes.URL,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard(title, "", sessionAttributes.URL)
                            .reprompt(question)
                            .getResponse();
                    }
                } 
                else { // Se han hecho todas las preguntas
                    
                    if (sessionAttributes.pantalla === "sonidos"){
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1) {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                            
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .getResponse();
                    }
                    else {
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1){
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                                title = "¡ENHORABUENA!";
                                subtitle = "TIENES 1 PUNTO";
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                if (sessionAttributes.puntos === 2) {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 2 PUNTOS";
                                }
                                else {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 3 PUNTOS";
                                }
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_chocolate.png";
                            title = "¡VAYA!";
                            subtitle = "TIENES 0 PUNTOS";
                        }
        
                        const documentName = "score"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "imageTemplateData": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": medalla,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title,
                                        "subtitle": subtitle
                                    }
                                }
                            }
                        });

                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .withStandardCard(title, subtitle, medalla)
                            .getResponse();
                            
                        }
                }
            }
            else { // NIVEL 2 
                
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.sonido: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                console.log("VALOR respCORRECTA nivel 2: " + respCorrecta);
                
                if(respCorrecta){
                    sessionAttributes.animalesAciertos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                    sessionAttributes.puntos += 1;
                } else {
                    sessionAttributes.animalesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                attributesManager.setSessionAttributes(sessionAttributes);
                
                if(sessionAttributes.Contador < 3) { // Todavía quedan preguntas por hacer
                    
                    if(sessionAttributes.pantalla === "sonidos") {
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                        speakOutput = correccion + question;
                            
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt(question)
                            .getResponse();
                            
                    } 
                    else { // El usuario quiere usar la pantalla
                        question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                        speakOutput = correccion + question;
                        title = "¿CUÁL ES EL COLECTIVO DE ESTE ANIMAL?";
        
                        const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "FotosDataSource": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": sessionAttributes.URL,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title
                                    }
                                }
                            }
                        });
                            
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .withStandardCard(title, "", sessionAttributes.URL)
                            .getResponse();
                    }
                }
                else { // Se han hecho todas las preguntas
                
                    if(sessionAttributes.pantalla === "sonidos") {
                            
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1) {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                            
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                                
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt()
                            .getResponse();
                        }
                    else {
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1){
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                                title = "¡ENHORABUENA!";
                                subtitle = "TIENES 1 PUNTO";
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                if (sessionAttributes.puntos === 2) {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 2 PUNTOS";
                                }
                                else {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 3 PUNTOS";
                                }
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_chocolate.png";
                            title = "¡VAYA!";
                            subtitle = "TIENES 0 PUNTOS";
                        }
                        
                        const documentName = "score"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "imageTemplateData": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": medalla,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title,
                                        "subtitle": subtitle
                                    }
                                }
                            }
                        });

                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                            
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt()
                            .withStandardCard(title, subtitle, medalla)
                            .getResponse();
                    }
                }
            }
                
        }
        else { // El dispositivo no soporta interfaces
                       
            if(sessionAttributes.Nivel === "1") {
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.nombreAnimal: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                
                if(respCorrecta){
                    sessionAttributes.animalesAciertos += 1;
                    sessionAttributes.puntos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                } 
                else {
                    sessionAttributes.animalesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                attributesManager.setSessionAttributes(sessionAttributes);

                if(sessionAttributes.Contador < 3) { // No se han hecho todas las preguntas
                    
                    
                    question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 1);
                    speakOutput = correccion + question;
                  
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(question)
                        .getResponse();
                } 
                else { // Se han hecho todas las preguntas
                
                    if(sessionAttributes.puntos > 0){
                        if(sessionAttributes.puntos === 1){
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                    }
                    else{
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                    }
                        
                    sessionAttributes.puntos = 0;
                    sessionAttributes.Contador = 0;
                    attributesManager.setSessionAttributes(sessionAttributes);
                    
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt()
                        .getResponse();
                }
            }
            else { // NIVEL 2 
                
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.sonido: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                console.log("VALOR respCORRECTA nivel 2: " + respCorrecta);
                
                if(respCorrecta){
                    sessionAttributes.animalesAciertos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                    sessionAttributes.puntos += 1;
                } else {
                    sessionAttributes.animalesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                attributesManager.setSessionAttributes(sessionAttributes);
                
                if(sessionAttributes.Contador < 3) { // Todavía quedan preguntas por hacer
                    
                    question = functions.getQuestion(handlerInput, data.animales, sessionAttributes.NombreJuego, 2);
                    speakOutput = correccion + question;
       
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(question)
                        .getResponse();
                }
                else { // Se han hecho todas las preguntas
                    if(sessionAttributes.puntos > 0){
                        if(sessionAttributes.puntos === 1){
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                    }
                    else{
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                    }

                    sessionAttributes.puntos = 0;
                    sessionAttributes.Contador = 0;
                    attributesManager.setSessionAttributes(sessionAttributes);
                            
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt()
                        .getResponse();
                }
            }
        }
    }
};

/*
* Se invoca cuando el usuario contesta a la pregunta realizada para el juego Transportes.
* Si se han realizado menos de 3 preguntas: Si la respuesta es correcta, emite sonido acierto y sigue preguntando. Si la respuesta es incorrecta, emite sonido fallo y sigue preguntando.
* Si se han realizado 3 preguntas: Indica los puntos obtenidos y las posibles acciones a realizar.
*/
const RespuestaTransportesIntentHandler = {
    canHandle(handlerInput) {
        console.log("RESPUESTA_TRANSPORTES_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RespuestaTransportesIntent';
    },
    
    handle(handlerInput) {
        console.log("Transportes respuestas");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        var question = ``;
        var speakOutput = ``;
        var respCorrecta = false;
        var correccion = ``;
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            var medalla = "";
            var title = "";
            var subtitle = "";
            
            if(sessionAttributes.Nivel === "1") {
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.nombreTransporte: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                
                if(respCorrecta){
                    sessionAttributes.transportesAciertos += 1;
                    sessionAttributes.puntos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                } 
                else {
                    sessionAttributes.transportesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                attributesManager.setSessionAttributes(sessionAttributes);

                if(sessionAttributes.Contador < 3) { // No se han hecho todas las preguntas
                    
                    
                    if(sessionAttributes.pantalla === "sonidos") { // El usuario no quiere utilizar pantalla
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                        speakOutput = correccion + question;
                    
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt(question)
                            .getResponse();
                    
                    // Usuario quiere pantalla 
                    } else { // El usuario ha elegido utilizar pantalla
                    
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                        speakOutput = correccion + question;
                        title = "¿QUÉ TRANSPORTE ES ESTE?";

                        const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "FotosDataSource": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": sessionAttributes.URL,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard(title, "", sessionAttributes.URL)
                            .reprompt(question)
                            .getResponse();
                    }
                } 
                else { // Se han hecho todas las preguntas
                    
                    if (sessionAttributes.pantalla === "sonidos"){
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1) {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            }
                            
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
    
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .getResponse();
                    }
                    else {
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1){
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                                title = "¡ENHORABUENA!";
                                subtitle = "TIENES 1 PUNTO";
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                if (sessionAttributes.puntos === 2) {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 2 PUNTOS";
                                }
                                else {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 3 PUNTOS";
                                }
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_chocolate.png";
                            title = "¡VAYA!";
                            subtitle = "TIENES 0 PUNTOS";
                        }
        
                        const documentName = "score"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "imageTemplateData": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": medalla,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title,
                                        "subtitle": subtitle
                                    }
                                }
                            }
                        });

                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .withStandardCard(title, subtitle, medalla)
                            .getResponse();
                            
                        }
                }
            }
            else { // NIVEL 2 
                
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.respuestaItem: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                console.log("VALOR respCORRECTA nivel 2: " + respCorrecta);
                
                if(respCorrecta){
                    sessionAttributes.transportesAciertos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                    sessionAttributes.puntos += 1;
                } else {
                    sessionAttributes.transportesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }                    
                
                attributesManager.setSessionAttributes(sessionAttributes);
                
                if(sessionAttributes.Contador < 3) { // Todavía quedan preguntas por hacer
                    
                    if(sessionAttributes.pantalla === "sonidos") {
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                        speakOutput = correccion + question;
                            
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                            
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt(question)
                            .getResponse();
                            
                    } 
                    else { // El usuario quiere usar la pantalla
                        question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                        speakOutput = correccion + question;
                        title = "¿POR QUÉ MEDIO VA ESTE TRANSPORTE?";
        
                        const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "FotosDataSource": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": sessionAttributes.URL,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title
                                    }
                                }
                            }
                        });
                            
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(question)
                            .withStandardCard(title, "", sessionAttributes.URL)
                            .getResponse();
                    }
                }
                else { // Se han hecho todas las preguntas
                
                    if(sessionAttributes.pantalla === "sonidos") {
                            
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1) {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("CAMBIO_MSG", sessionAttributes.nombreUsuario);
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("CAMBIO_MSG", sessionAttributes.nombreUsuario);
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("CAMBIO_MSG", sessionAttributes.nombreUsuario);
                        }
                            
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                                
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .reprompt()
                            .getResponse();
                        }
                    else {
                        
                        if(sessionAttributes.puntos > 0) {
                            if(sessionAttributes.puntos === 1){
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                                title = "¡ENHORABUENA!";
                                subtitle = "TIENES 1 PUNTO";
                            }
                            else {
                                speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                                if (sessionAttributes.puntos === 2) {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 2 PUNTOS";
                                }
                                else {
                                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                                    title = "¡ENHORABUENA!";
                                    subtitle = "TIENES 3 PUNTOS";
                                }
                            }
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_chocolate.png";
                            title = "¡VAYA!";
                            subtitle = "TIENES 0 PUNTOS";
                        }
                        
                        const documentName = "score"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "imageTemplateData": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": medalla,
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": title,
                                        "subtitle": subtitle
                                    }
                                }
                            }
                        });

                        sessionAttributes.puntos = 0;
                        sessionAttributes.Contador = 0;
                        attributesManager.setSessionAttributes(sessionAttributes);
                            
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt()
                            .withStandardCard(title, subtitle, medalla)
                            .getResponse();
                    }
                }
            }
                
        }
        else { // El dispositivo no soporta interfaces
                       
            if(sessionAttributes.Nivel === "1") {
                
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.nombreAnimal: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                
                if(respCorrecta){
                    sessionAttributes.transportesAciertos += 1;
                    sessionAttributes.puntos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                } 
                else {
                    sessionAttributes.transportesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                attributesManager.setSessionAttributes(sessionAttributes);
                
                if(sessionAttributes.Contador < 3) { // No se han hecho todas las preguntas
                    
                    question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 1);
                    speakOutput = correccion + question;
                  
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(question)
                        .getResponse();
                } 
                else { // Se han hecho todas las preguntas
                
                    if(sessionAttributes.puntos > 0){
                        if(sessionAttributes.puntos === 1){
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                    }
                    else{
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                    }
                        
                    sessionAttributes.puntos = 0;
                    sessionAttributes.Contador = 0;
                    attributesManager.setSessionAttributes(sessionAttributes);
                    
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt()
                        .getResponse();
                }
            }
            else { // NIVEL 2 
                
                console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
                console.log("sessionAttributes.sonido: " + sessionAttributes.respuestaItem);
                respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
                console.log("VALOR respCORRECTA nivel 2: " + respCorrecta);
                
                if(respCorrecta){
                    sessionAttributes.transportesAciertos += 1;
                    correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                    sessionAttributes.puntos += 1;
                } else {
                    sessionAttributes.transportesFallos += 1;
                    correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
                }
                
                attributesManager.setSessionAttributes(sessionAttributes);

                
                if(sessionAttributes.Contador < 3) { // Todavía quedan preguntas por hacer
                    
                    question = functions.getQuestion(handlerInput, data.transportes, sessionAttributes.NombreJuego, 2);
                    speakOutput = correccion + question;
       
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(question)
                        .getResponse();
                }
                else { // Se han hecho todas las preguntas
                    if(sessionAttributes.puntos > 0){
                        if(sessionAttributes.puntos === 1){
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                        else {
                            speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        }
                    }
                    else{
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                    }

                    sessionAttributes.puntos = 0;
                    sessionAttributes.Contador = 0;
                    attributesManager.setSessionAttributes(sessionAttributes);
                            
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt()
                        .getResponse();
                }
            }
        }
    }
};

/*
* Se invoca cuando el usuario contesta a la pregunta realizada para el juego Letras y numeros.
* Si se han realizado menos de 3 preguntas: Si la respuesta es correcta, emite sonido acierto y sigue preguntando. Si la respuesta es incorrecta, emite sonido fallo y sigue preguntando.
* Si se han realizado 3 preguntas: Indica los puntos obtenidos y las posibles acciones a realizar.
*/
const RespuestaLyNIntentHandler = {
    
    canHandle(handlerInput) {
        console.log("RESPUESTA_LYN_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RespuestaLyNIntent';
    },
    
    handle(handlerInput) {
        console.log("Letras y numeros respuestas");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        var question = ``;
        var speakOutput = ``;
        var respCorrecta = false;
        var correccion = ``;

        var medalla = "";
        var title = "";
        var subtitle = "";
        
        if(sessionAttributes.Nivel === "1") {
            console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
            console.log("sessionAttributes.LyN: " + sessionAttributes.respuestaItem);
            respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
            
            if(respCorrecta){
                sessionAttributes.lynAciertos += 1;
                sessionAttributes.puntos += 1;
                correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
            } 
            else {
                sessionAttributes.lynFallos += 1;
                correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
            }
            
            attributesManager.setSessionAttributes(sessionAttributes);
            
            if(sessionAttributes.Contador < 3) { // No se han hecho todas las preguntas
                
                question = functions.getQuestion(handlerInput, data.lyn_N1, sessionAttributes.NombreJuego, 1);
                speakOutput = correccion + question;
                title = "¿" + sessionAttributes.Pregunta + " '" + sessionAttributes.Digito + "' " + "HAY?";
                
                const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";
    
                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "FotosDataSource": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": sessionAttributes.URL,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": title
                            }
                        }
                    }
                });
                        
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard(title, "", sessionAttributes.URL)
                    .reprompt(question)
                    .getResponse();
            }
            
            else { // Se han hecho todas las preguntas
                    
                if(sessionAttributes.puntos > 0) {
                    if(sessionAttributes.puntos === 1){
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                        title = "¡ENHORABUENA!";
                        subtitle = "TIENES 1 PUNTO";
                    }
                    else {
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        if (sessionAttributes.puntos === 2) {
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                            title = "¡ENHORABUENA!";
                            subtitle = "TIENES 2 PUNTOS";
                        }
                        else {
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                            title = "¡ENHORABUENA!";
                            subtitle = "TIENES 3 PUNTOS";
                        }
                    }
                }
                else {
                    speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario)+ requestAttributes.t("CAMBIO_MSG");
                    title = "¡VAYA!";
                    subtitle = "TIENES 0 PUNTOS";
                }
        
                const documentName = "score"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";
        
                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "imageTemplateData": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": medalla,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": title,
                                "subtitle": subtitle
                            }
                        }
                    }
                });

                sessionAttributes.puntos = 0;
                sessionAttributes.Contador = 0;
                attributesManager.setSessionAttributes(sessionAttributes);
                    
                return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(question)
                        .withStandardCard(title, subtitle, medalla)
                        .getResponse();
                        
            }

        }
        else { // NIVEL 2 
                
            console.log("SLOT: " + handlerInput.requestEnvelope.request.intent.slots);
            console.log("sessionAttributes.respuestaItem: " + sessionAttributes.respuestaItem);
            respCorrecta = functions.comparaRespuesta(handlerInput.requestEnvelope.request.intent.slots, sessionAttributes.respuestaItem);
            console.log("VALOR respCORRECTA nivel 2: " + respCorrecta);
            
            if(respCorrecta){
                sessionAttributes.lynAciertos += 1;
                correccion = requestAttributes.t("RESPUESTA_CORRECTA", sessionAttributes.nombreUsuario);
                sessionAttributes.puntos += 1;
            } else {
                sessionAttributes.lynFallos += 1;
                correccion = requestAttributes.t("RESPUESTA_INCORRECTA", sessionAttributes.nombreUsuario);
            }
            
            attributesManager.setSessionAttributes(sessionAttributes);
                
            if(sessionAttributes.Contador < 3) { // Todavía quedan preguntas por hacer
                
                question = functions.getQuestion(handlerInput, data.lyn_N2, sessionAttributes.NombreJuego, 2);
                speakOutput = correccion + question;
                title = "¿" + sessionAttributes.Pregunta + " " +sessionAttributes.Digito + " HAY?";
        
                const documentName = "preguntasFoto"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";
        
                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "FotosDataSource": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": sessionAttributes.URL,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": title
                            }
                        }
                    }
                });
                        
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(question)
                    .withStandardCard(title, "", sessionAttributes.URL)
                    .getResponse();
            }
            else { // Se han hecho todas las preguntas
            
                if(sessionAttributes.puntos > 0) {
                    if(sessionAttributes.puntos === 1){
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_1PUNTO") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_bronce.png";
                        title = "¡ENHORABUENA!";
                        subtitle = "TIENES 1 PUNTO";
                    }
                    else {
                        speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_PUNTOS", sessionAttributes.puntos) + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                        if (sessionAttributes.puntos === 2) {
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_plata.png";
                            title = "¡ENHORABUENA!";
                            subtitle = "TIENES 2 PUNTOS";
                        }
                        else {
                            medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_oro.png";
                            title = "¡ENHORABUENA!";
                            subtitle = "TIENES 3 PUNTOS";
                        }
                    }
                }
                else {
                    speakOutput = correccion + requestAttributes.t("SONIDO_FINAL") + requestAttributes.t("FINAL_SinPUNTOS") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("CAMBIO_MSG");
                    medalla = "https://diviertetea.s3.eu-west-1.amazonaws.com/medalla_chocolate.png";
                    title = "¡VAYA!";
                    subtitle = "TIENES 0 PUNTOS";
                }
                        
                const documentName = "score"; // Name of the document saved in the authoring tool
                const token = documentName + "Token";
        
                // Add the RenderDocument directive to the response
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: token,
                    document: {
                        src: 'doc://alexa/apl/documents/' + documentName,
                        type: 'Link'
                    },
                    datasources: {
                        "imageTemplateData": {
                            "type": "object",
                            "objectId": "imageSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "image": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": medalla,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": title,
                                "subtitle": subtitle
                            }
                        }
                    }
                });

                sessionAttributes.puntos = 0;
                sessionAttributes.Contador = 0;
                attributesManager.setSessionAttributes(sessionAttributes);
                            
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt()
                    .withStandardCard(title, subtitle, medalla)
                    .getResponse();
            }
        }
    }

};

const CambioIntentHandler = {
    canHandle(handlerInput) {
        console.log("CAMBIO_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CambioIntent';
    },
    handle(handlerInput) {
        console.log("CAMBIO REALIZADO");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const cambio = intent.slots.cambio.value;
        console.log(cambio);
        var speakOutput = ``;
        
        if(cambio === "juego") {
            
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){ // El dispositivo soporta interfaces
            
                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG");
    
                if(sessionAttributes.pantalla === "pantalla") { // El usuario quiere usar la pantalla
                        
                    const documentName = "menuJuegos"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: {
                            "menuJuegosDataSource": {
                                "type": "object",
                                "objectId": "imageListSample",
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                    "largeSourceUrl": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "title": "",
                                "listItems": [
                                    {
                                        "primaryText": "Animales",
                                        "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/inicio.jpg",
                                        "primaryAction": [
                                            {
                                                "type": "SetValue",
                                                "componentId": "menu",
                                                "property": "headerTitle",
                                                "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                            }
                                        ]
                                    },
                                    {
                                        "primaryText": "Transportes",
                                        "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/transportes.png",
                                        "primaryAction": [
                                            {
                                                "type": "SetValue",
                                                "componentId": "menu",
                                                "property": "headerTitle",
                                                "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                            }
                                        ]
                                    },
                                    {
                                        "primaryText": "Letras y números",
                                        "imageSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/letrasynumeros.jpg",
                                        "primaryAction": [
                                            {
                                                "type": "SetValue",
                                                "componentId": "menu",
                                                "property": "headerTitle",
                                                "value": "${payload.imageListData.listItems[0].primaryText} is selected"
                                            }
                                        ]
                                    }
                                ],
                                "hintText": "Di \"Animales\""
                            }
                        }
                    });
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard("¿Qué juego quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/inicio.jpg", "https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/transportes.png", "https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/letrasynumeros.jpg")
                        .reprompt(speakOutput)
                        .getResponse();
                    
                } 
                else { // El usuario no quiere usar la pantalla
                        
                    console.log("Usuario no quiere pantalla");
        
                    const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
        
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: { 
                            "headlineTemplateData": {
                                "type": "object",
                                "objectId": "headlineSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                        
                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
                        
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                        .reprompt(speakOutput)
                        .getResponse();
                }
            }
            //El dispositivo no admite interfaces
            else { 
                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREG_JUEGO_MSG_SIN_PANTALLA");
                    
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .withStandardCard("", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                    .reprompt(speakOutput)
                    .getResponse();
            }
        }
        else {
            if(cambio === "nivel") {
                
                if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){ // El dispositivo soporta interfaces
                
                    if(sessionAttributes.pantalla === "pantalla") { // El usuario quiere usar la pantalla
                    
                        if(sessionAttributes.NombreJuego === "animales"){
                                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_PANTALLA_NIVELES");
                        }
                        else {
                            if(sessionAttributes.NombreJuego === "transportes"){
                                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_PANTALLA_NIVELES");
                            }
                            else {
                                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("LYN_NIVELES");
                            }
                        }
                        
                        const documentName = "niveles"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
        
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: {
                                "imageTemplateData": {
                                    "type": "object",
                                    "objectId": "imageSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "image": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/niveles.png",
                                                    "size": "large"
                                                }
                                            ]
                                        },
                                        "title": "¿QUÉ NIVEL QUIERES?"
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .withStandardCard("¿Qué nivel quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/niveles.png")
                            .reprompt(speakOutput)
                            .getResponse();
                    }
                    else { // El usuario no quiere utilizar la pantalla
                        
                        if(sessionAttributes.NombreJuego === "animales"){
                            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_SONIDO_NIVELES");
                        }
                        else {
                            if(sessionAttributes.NombreJuego === "transportes"){
                                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_SONIDO_NIVELES");
                            }
                            else {
                                if(sessionAttributes.NombreJuego === "letras y numeros"){
                                    speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("JUEGO_NO_DISPONIBLE_MODALIDAD");
                                }
                            }
                        }
                        
                        const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                        const token = documentName + "Token";
                
                        // Add the RenderDocument directive to the response
                        handlerInput.responseBuilder.addDirective({
                            type: 'Alexa.Presentation.APL.RenderDocument',
                            token: token,
                            document: {
                                src: 'doc://alexa/apl/documents/' + documentName,
                                type: 'Link'
                            },
                            datasources: { 
                                "headlineTemplateData": {
                                    "type": "object",
                                    "objectId": "headlineSample",
                                    "properties": {
                                        "backgroundImage": {
                                            "contentDescription": null,
                                            "smallSourceUrl": null,
                                            "largeSourceUrl": null,
                                            "sources": [
                                                {
                                                    "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                    "size": "large"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        });
                        
                        return handlerInput.responseBuilder
                            .speak(speakOutput)
                            .reprompt(speakOutput)
                            .withStandardCard("¿Qué nivel quieres?", "", "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg")
                            .getResponse();
                    }
                }
                // El dispositivo no admite interfaces
                else {
                    if(sessionAttributes.NombreJuego === "animales"){
                            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("ANIMALES_SONIDO_NIVELES");
                    }
                    else {
                        if(sessionAttributes.NombreJuego === "transportes"){
                            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("TRANSPORTES_SONIDO_NIVELES");
                        }
                        else {
                            if(sessionAttributes.NombreJuego === "letras y numeros"){
                                speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("JUEGO_NO_DISPONIBLE_MODALIDAD");
                            }
                        }
                    }
                
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(speakOutput)
                        .getResponse();
                }
            }
        }
    }
};

const EvolucionIntentHandler = {
    canHandle(handlerInput) {
        console.log("EVOLUCION_INTENTHANDLER");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'EvolucionIntent';
    },
    handle(handlerInput) {
        console.log("EVOLUCION");
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        attributesManager.setSessionAttributes(sessionAttributes);
        
        const animalesAciertos = sessionAttributes['animalesAciertos'];
        const animalesFallos = sessionAttributes['animalesFallos'];
        const transportesAciertos = sessionAttributes['transportesAciertos'];
        const transportesFallos = sessionAttributes['transportesFallos'];
        const lynAciertos = sessionAttributes['lynAciertos'];
        const lynFallos = sessionAttributes['lynFallos'];
        
        var speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("SIN_EVOLUCION_MSG");
        
        console.log(sessionAttributes);
        
        if(animalesAciertos !== null && animalesFallos !== null && transportesAciertos !== null && transportesFallos !== null && lynAciertos !== null && lynFallos !== null) {
        
            speakOutput = requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("EVOLUCION_MSG");
        
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
                
                if(animalesAciertos !== 1 && animalesFallos !==1) { 
                    speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("ACIERTOS_FALLOS", animalesAciertos, animalesFallos);
                }
                else {
                    if(animalesAciertos === 1) {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("ACIERTOS_SINGULAR", animalesFallos);
                    }
                    else {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("FALLOS_SINGULAR", animalesAciertos);
                    }
                }
                
                if(transportesAciertos !== 1 && transportesFallos !==1) { 
                    speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("ACIERTOS_FALLOS", transportesAciertos, transportesFallos);
                }
                else {
                    if(transportesAciertos === 1) {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("ACIERTOS_SINGULAR", transportesFallos);
                    }
                    else {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("FALLOS_SINGULAR", transportesAciertos);
                    }
                }
                
                if(lynAciertos !== 1 && lynFallos !==1) { 
                    speakOutput += requestAttributes.t("JUEGO_MSG", 'Letras y números') + requestAttributes.t("ACIERTOS_FALLOS", lynAciertos, lynFallos);
                }
                else {
                    if(lynAciertos === 1) {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Letras y números') + requestAttributes.t("ACIERTOS_SINGULAR", lynFallos);
                    }
                    else {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Letras y números') + requestAttributes.t("FALLOS_SINGULAR", lynAciertos);
                    }
                }
                
                speakOutput += requestAttributes.t("ENHORABUENA_MSG") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREGUNTA_ACCION_MSG");
                
                if(sessionAttributes.pantalla === "pantalla") { // El usuario quiere usar la pantalla
                    
                    const documentName = "evolucion"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
    
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: {
                            "textListData": {
                                "type": "object",
                                "objectId": "textListSample",
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "listItems": [
                                    {
                                        "primaryText": "Animales",
                                        "secondaryText": "Aciertos: " + animalesAciertos,
                                        "secondaryTextPosition": "bottom",
                                        "tertiaryText": "Fallos: " + animalesFallos,
                                        "tertiaryTextPosition": "bottom",
                                        "imageThumbnailSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/inicio.jpg",
                                        "hideOrdinal": true,
                                        "touchForward": false
                                    },
                                    {
                                        "primaryText": "Transportes",
                                        "secondaryText": "Aciertos: " + transportesAciertos,
                                        "secondaryTextPosition": "bottom",
                                        "tertiaryText": "Fallos: " + transportesFallos,
                                        "tertiaryTextPosition": "bottom",
                                        "imageThumbnailSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/transportes.png",
                                        "hideOrdinal": true,
                                        "touchForward": false
                                    },
                                    {
                                        "primaryText": "Letras y números",
                                        "secondaryText": "Aciertos: " + lynAciertos,
                                        "secondaryTextPosition": "bottom",
                                        "tertiaryText": "Fallos: " + lynFallos,
                                        "tertiaryTextPosition": "bottom",
                                        "imageThumbnailSource": "https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/letrasynumeros.jpg",
                                        "hideOrdinal": true,
                                        "touchForward": false
                                    }
                                ]
                            }
                        }
                    });
                    
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(requestAttributes.t("PREGUNTA_ACCION_MSG"))
                        .getResponse();
                
                } else { // El usuario no quiere usar la pantalla
                    
                    console.log("Usuario no quiere pantalla");
    
                    const documentName = "soloSonido"; // Name of the document saved in the authoring tool
                    const token = documentName + "Token";
    
                    // Add the RenderDocument directive to the response
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: token,
                        document: {
                            src: 'doc://alexa/apl/documents/' + documentName,
                            type: 'Link'
                        },
                        datasources: { 
                            "headlineTemplateData": {
                                "type": "object",
                                "objectId": "headlineSample",
                                "properties": {
                                    "backgroundImage": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://diviertetea.s3.eu-west-1.amazonaws.com/fondo.jpg",
                                                "size": "large"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    });
                    
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt(requestAttributes.t("PREGUNTA_ACCION_MSG"))
                        .getResponse();
                }
            }
            
            else {
                if(animalesAciertos !== 1 && animalesFallos !==1) { 
                    speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("ACIERTOS_FALLOS", animalesAciertos, animalesFallos);
                }
                else {
                    if(animalesAciertos === 1) {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("ACIERTOS_SINGULAR", animalesFallos);
                    }
                    else {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Animales') + requestAttributes.t("FALLOS_SINGULAR", animalesAciertos);
                    }
                }
                
                if(transportesAciertos !== 1 && transportesFallos !==1) { 
                    speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("ACIERTOS_FALLOS", transportesAciertos, transportesFallos);
                }
                else {
                    if(transportesAciertos === 1) {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("ACIERTOS_SINGULAR", transportesFallos);
                    }
                    else {
                        speakOutput += requestAttributes.t("JUEGO_MSG", 'Transportes') + requestAttributes.t("FALLOS_SINGULAR", transportesAciertos);
                    }
                }
            }
            
            speakOutput += requestAttributes.t("ENHORABUENA_MSG") + requestAttributes.t("NOMBRE", sessionAttributes.nombreUsuario) + requestAttributes.t("PREGUNTA_ACCION_MSG");
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t("PREGUNTA_ACCION_MSG"))
            .getResponse();
    }
};

/*
* Se invoca cuando el usuario pide ayuda.
*/
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t("HELP_MSG");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        sessionAttributes['respuestaItem'] = null;
        sessionAttributes['nombreUsuario'] = null;
        sessionAttributes['URL'] = null;
        sessionAttributes['puntos'] = null;
        sessionAttributes['Contador'] = null;
        sessionAttributes['NombreJuego'] = null;
        sessionAttributes['Pregunta'] = null;
        sessionAttributes['pantalla'] = null;
        sessionAttributes['Digito'] = null;
        sessionAttributes['Nivel'] = null;
        
        attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = requestAttributes.t("GOODBYE_MSG");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t("FALLBACK_MSG");
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
       canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        sessionAttributes['respuestaItem'] = null;
        sessionAttributes['nombreUsuario'] = null;
        sessionAttributes['URL'] = null;
        sessionAttributes['puntos'] = null;
        sessionAttributes['Contador'] = null;
        sessionAttributes['NombreJuego'] = null;
        sessionAttributes['Digito'] = null;
        sessionAttributes['Pregunta'] = null;
        /*sessionAttributes['animalesAciertos'] = null;
        sessionAttributes['animalesFallos'] = null;
        sessionAttributes['transportesAciertos'] = null;
        sessionAttributes['transportesFallos'] = null;
        sessionAttributes['lynAciertos'] = null;
        sessionAttributes['lynFallos'] = null;*/
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        if(null!==handlerInput.requestEnvelope.request.error) {
            console.log(JSON.stringify(handlerInput.requestEnvelope.request.error));
        }

        return handlerInput.responseBuilder.getResponse();
    },
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const {attributesManager} = handlerInput;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t("REFLECTOR_MSG");

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento, eso no lo sé. Por favor, dime que quieres hacer.';
        console.log (error);
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .withSkillId("amzn1.ask.skill.8fbc3b28-8925-4940-ae99-b70d37c1205a")
    .withPersistenceAdapter(persistenceAdapter)
    .addRequestHandlers(
        LaunchRequestHandler,
        OpcionPantallaIntentHandler,
        PreguntaJuegoIntentHandler,
        NivelIntentHandler,
        PreguntasIntentHandler,
        RespuestaAnimalesIntentHandler,
        RespuestaTransportesIntentHandler,
        RespuestaLyNIntentHandler,
        CambioIntentHandler,
        EvolucionIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        IntentReflectorHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        interceptor.LoggingRequestInterceptor, 
        interceptor.LocalisationInterceptor,
        interceptor.LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        interceptor.LoggingResponseInterceptor,
        interceptor.SaveAttributesResponseInterceptor)
    .lambda();