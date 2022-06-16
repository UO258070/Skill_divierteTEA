module.exports = {
    es:{
        translation: {
            WELCOME_MSG: 'Bienvenido a divierteTEA. Antes de empezar:\n',
            NAME_MSG: '¿Cómo te llamas?',
            NOMBRE: '%s, ',
            PANTALLA_MSG: 'Dime, ¿quieres jugar con pantalla o solo con sonidos?',
            PREG_JUEGO_MSG: ' ¿a qué quieres jugar?',
            PREG_JUEGO_MSG_SIN_PANTALLA: ' ¿qué juego quieres? Opción <say-as interpret-as="cardinal">1</say-as>: Los animales. Opción <say-as interpret-as="cardinal">2</say-as>: Los transportes ¿Cuál quieres?',
            
            ANIMALES_SONIDO_NIVELES: ' Escoge un nivel. Nivel <say-as interpret-as="cardinal">1</say-as>, reproduciré un sonido y me tienes que decir que animal es. Nivel 2, te diré un animal y me tienes que decir cual es su colectivo. Si quieres el nivel 1 di "el 1" y si quieres el nivel 2 di "el 2". ¿Cuál quieres?',
            ANIMALES_PANTALLA_NIVELES: ' Escoge un nivel. Nivel <say-as interpret-as="cardinal">1</say-as>, te enseñaré una foto y me tienes que decir que animal es. Nivel 2, te enseñaré una foto y me tienes que decir cual es el colectivo. Si quieres el nivel 1 di "el 1" y si quieres el nivel 2 di "el 2". ¿Cuál quieres?',
            INTRO_ANIMALES_N1: 'Nivel <say-as interpret-as="cardinal">1</say-as>. %s, dime que animales son estos. ',
            INTRO_ANIMALES_N2: 'Nivel 2. %s dime cuales son los colectivos de estos animales. ',
            PREGUNTA_ANIMALES_N1: 'Pregunta %s. ¿Qué animal es este? %s',
            PREGUNTA_ANIMALES_N2: 'Pregunta %s. ¿Cuál es el colectivo de %s %s?',
            
            TRANSPORTES_SONIDO_NIVELES: ' Escoge un nivel. Nivel <say-as interpret-as="cardinal">1</say-as>, reproduciré un sonido y me tienes que decir que transporte es. Nivel 2, te diré un transporte y me tienes que decir por que medio va. Si quieres el nivel 1 di "el 1" y si quieres el nivel 2 di "el 2". ¿Cuál quieres?',
            TRANSPORTES_PANTALLA_NIVELES: ' Escoge un nivel. Nivel <say-as interpret-as="cardinal">1</say-as>, te enseñaré una foto y me tienes que decir que transporte es. Nivel 2, te enseñaré un transporte y me tienes que decir por que medio va. Si quieres el nivel 1 di "el 1" y si quieres el nivel 2 di "el 2". ¿Cuál quieres?',
            INTRO_TRANSPORTES_N1: 'Nivel <say-as interpret-as="cardinal">1</say-as>. %s, dime que medios de transporte son estos. ',
            INTRO_TRANSPORTES_N2: 'Nivel 2. %s, dime por que medio van estos transportes. ',
            PREGUNTA_TRANSPORTES_N1: 'Pregunta %s. ¿Qué medio de transporte es este? %s',
            PREGUNTA_TRANSPORTES_N2: 'Pregunta %s. ¿Por qué medio va %s %s? ¿Por tierra, por mar o por aire?',
            
            LYN_NIVELES: ' Escoge un nivel. Nivel <say-as interpret-as="cardinal">1</say-as>, te enseñaré unas letras y unos números y tienes que decirme cuántos hay del que yo te diga. Nivel 2, te enseñaré unas letras y unos números y tienes que decirme cuántos hay del grupo que yo diga. Cual quieres, Si quieres el nivel 1 di "el 1" y si quieres el nivel 2 di "el 2". ¿Cuál quieres?',
            INTRO_LYN_N1: 'Nivel <say-as interpret-as="cardinal">1</say-as>. %s, Dime cuántas letras o números hay del que te voy a decir. ',
            INTRO_LYN_N2: 'Nivel 2. %s, Dime cuántos hay del grupo que te voy a decir. ',
            PREGUNTA_LYN_N1: 'Pregunta %s. ¿%s "%s" hay?',
            PREGUNTA_LYN_N2: 'Pregunta %s. ¿%s "%s" hay?',
            
            RESPUESTA_CORRECTA: '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>',
            RESPUESTA_INCORRECTA: '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_02"/>',
            SONIDO_FINAL: '<audio src="soundbank://soundlibrary/gameshow/gameshow_01"/>',
            FINAL_PUNTOS: 'Hemos terminado. Conseguiste %s puntos. <say-as interpret-as="interjection">¡Enhorabuena!</say-as>',
            FINAL_1PUNTO: 'Hemos terminado. Conseguiste 1 punto. <say-as interpret-as="interjection">¡Enhorabuena!</say-as>',
            FINAL_SinPUNTOS: "Vaya, no has conseguido ningún punto. No te preocupes, la próxima vez lo harás mejor. ",
            
            CAMBIO_MSG: 'puedes terminar, cambiar de juego, cambiar de nivel o ver tu evolución. ¿Qué quieres hacer?',
            
            JUEGO_NO_DISPONIBLE_MODALIDAD: 'ese juego no está disponible para la modalidad que has elegido. Por favor, di otro',
            JUEGO_NO_DISPONIBLE: 'ese juego no está disponible. Por favor, di otro',
            
            SIN_EVOLUCION_MSG: ' Todavía no has jugado a ningún juego. Juguemos a uno y tendrás la evolución disponible',
            EVOLUCION_MSG: ' Aquí tienes tu evolución: ',
            JUEGO_MSG: 'En el juego "%s" tienes ',
            ACIERTOS_SINGULAR: '1 acierto y %s fallos. ',
            FALLOS_SINGULAR: '%s aciertos y 1 fallo. ',
            ACIERTOS_FALLOS: '%s aciertos y %s fallos. ',
            ENHORABUENA_MSG: '<say-as interpret-as="interjection">¡Enhorabuena!</say-as> Sigue así, lo haces muy bien. ',
            PREGUNTA_ACCION_MSG: 'Ahora puedes cambiar de juego, cambiar de nivel o terminar. ¿Qué quieres hacer?',
            
            HELP_MSG: 'Dime a qué quieres jugar',
            GOODBYE_MSG: 'Me ha gustado estar contigo. ¡Hasta el próximo día!',
            REFLECTOR_MSG: 'Repite, por favor.',
            FALLBACK_MSG: 'Lo siento, no te entendí. Dime qué quieres hacer.',
        }
    }
}