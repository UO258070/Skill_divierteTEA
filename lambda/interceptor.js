//i18n dependencias
//i18n modulo principal
const i18n = require('i18next');
const { process } = require('i18next-sprintf-postprocessor');
// sprintf permite incluir variables
const sprintf = require('i18next-sprintf-postprocessor');

module.exports = {
    LoggingRequestInterceptor : {
        process(handlerInput) {
            console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
        }
    },
    
    LoggingResponseInterceptor : {
        process(handlerInput, response) {
            console.log(`Outgoing response: ${JSON.stringify(response)}`);
        }
    },
    
    LocalisationInterceptor : {
        process(handlerInput) {
            const localisationClient = i18n.use(sprintf).init({
                lng: handlerInput.requestEnvelope.request.locale,
                //en que idioma responde siempre que haya un problema
                fallbackLng: 'es',
                overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
                resources: require('./localisation'),
                returnObjects: true
            });
            
            const attributes = handlerInput.attributesManager.getRequestAttributes();
            attributes.t = function (...args) {
                return localisationClient.t(...args);
            }
        }
    },
    
    LoadAttributesRequestInterceptor : {
        async process(handlerInput) {
            if(handlerInput.requestEnvelope.session['new']){
                const {attributesManager} = handlerInput;
                const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
                handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
            }
        }
    },
    
    SaveAttributesResponseInterceptor : {
        async process(handlerInput, response) {
            const {attributesManager} = handlerInput;
            const sessionAttributes = attributesManager.getSessionAttributes();
            const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);
            if(shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedResquest') {
                attributesManager.setPersistentAttributes(sessionAttributes);
                await attributesManager.savePersistentAttributes();
            }
        }
    }
}