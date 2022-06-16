
const animales = [
    
    {  
        Nombre: 'abeja',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/abeja1.mp3"/>',
        FotoInd: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/abeja.jpg",
        Colectivo: 'enjambre',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/abejas.jpg'
    },
    {  
        Nombre: 'ardilla',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/ardilla1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ardilla.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ardillas.jpg'
    },
    {  
        Nombre: 'avestruz',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/avestruz1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/avestruz.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/avestruces.jpg'
    },
    {  
        Nombre: 'buho',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/buho1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/buho.jpg",
        Colectivo: 'parlamento',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/buhos.jpg'
    },
    {  
        Nombre: 'ballena',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/ballena1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ballena.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ballenas.jpg'
    },
    {  
        Nombre: 'burro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/burro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/burro.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/burros.jpg'
    },
    {  
        Nombre: 'caballo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/caballo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/caballo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/caballos.jpg'
    },
    {  
        Nombre: 'caballito de mar',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/caballitoMar1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/caballito+de+mar.jpeg",
        Colectivo: 'banco',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/caballitos_mar.jpg'
    },
    {  
        Nombre: 'camello',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/camello1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/camello.jpg",
        Colectivo: 'rebaño',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/camellos.jpg'
    },
    {  
        Nombre: 'canguro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/canguro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/canguro.jpg",
        Colectivo: 'turba',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/canguros.jpg'
    },
    {  
        Nombre: 'cebra',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/cebra1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cebra.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cebras.jpg'
    },
    {  
        Nombre: 'cerdo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/cerdo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cerdo.jpg",
        Colectivo: 'piara',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cerdos.jpg'
    },
    {  
        Nombre: 'cisne',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/cisne1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/Cisne.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cisnes.jpg'
    },
    {  
        Nombre: 'cocodrilo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/cocodrilo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cocodrilo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/cocodrilos.jpg'
    },
    {  
        Nombre: 'conejo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/conejo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/conejo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/conejos.jpg'
    },
    {  
        Nombre: 'delfín',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/delfin1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/delfin.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/delfines.jpg'
    },
    {  
        Nombre: 'elefante',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/elefante1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/elefante.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/elefantes.jpg'
    },
    {  
        Nombre: 'flamenco',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/flamenco1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/flamenco.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/flamencos.jpg'
    },
    {  
        Nombre: 'foca',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/foca1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/foca.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/focas.jpg'
    },
    {  
        Nombre: 'gallo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/gallo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/gallo.jpeg",
        Colectivo: 'averío',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/gallos.jpg'
    },
    {  
        Nombre: 'gato',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/gato1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/merlin.jpeg",
        Colectivo: 'gaterío',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/gatos.jpg'
    },
    {  
        Nombre: 'gorila',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/gorila1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/gorila.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/gorilas.jpg'
    },
    {  
        Nombre: 'hipopótamo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/hipopotamo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/hipopotamo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/hipopotamos.jpg'
    },
    {  
        Nombre: 'jirafa',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/jirafa1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/jirafa.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/jirafas.jpg'
    },
    {  
        Nombre: 'koala',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/koala1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/koala.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/koalas.jpg'
    },
    {  
        Nombre: 'león',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/leon1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/leon.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/leones.jpg'
    },
    {  
        Nombre: 'lobo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/lobo1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/lobo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/lobos.jpg'
    },
    {  
        Nombre: 'loro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/loro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/loro.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/loros.jpg'
    },
    {  
        Nombre: 'mono',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/mono1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/mono.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/monos.jpg'
    },
    {  
        Nombre: 'oso panda',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/oso1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/oso+panda.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/osospanda.jpg'
    },
    {  
        Nombre: 'oso pardo',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/oso1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/oso+pardo.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/osospardo.jpg'
    },
    {  
        Nombre: 'oso polar',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/oso1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/oso+polar.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/osospolares.jpg'
    },
    {  
        Nombre: 'oveja',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/oveja1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/oveja.jpg",
        Colectivo: 'rebaño',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ovejas.jpg'
    },
    {
        Nombre: 'pájaro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/pajaro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pajaro.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pajaros.jpg'
    },
    {  
        Nombre: 'pato',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/pato1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pato.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/patos.jpg'
    },
    {  
        Nombre: 'perro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/perro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/perro.jpeg",
        Colectivo: 'jauría',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/perros.jpg'
    },
    {  
        Nombre: 'pez',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/pez1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pez.jpg",
        Colectivo: 'banco',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/peces.jpg'
    },
    {  
        Nombre: 'pollito',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/pollito1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pollito.jpg",
        Colectivo: 'bandada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/pollitos.jpg'
    },
    {  
        Nombre: 'ratón',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/raton1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/raton.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/ratones.jpg'
    },
    {  
        Nombre: 'reno',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/reno1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/reno.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/renos.jpg'
    },
    {  
        Nombre: 'rinoceronte',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/rinoceronte1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/rinoceronte.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/rinocerontes.JPG'
    },
    {  
        Nombre: 'serpiente',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/serpiente1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/serpiente.jpg",
        Colectivo: 'cama',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/serpientes.jpeg'
    },
    {  
        Nombre: 'tiburón',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/pez1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tiburon.jpg",
        Colectivo: 'cardumen',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tiburones.jpg'
    },
    {  
        Nombre: 'tigre',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/tigre1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tigre.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tigres.jpg'
    },
    {  
        Nombre: 'toro',
        Genero: 'el',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/toro1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/toro.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/toros.jpg'
    },
    {  
        Nombre: 'tortuga',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/tortuga1.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tortuga.jpg",
        Colectivo: 'manada',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/tortugas.jpg'
    },
    {  
        Nombre: 'vaca',
        Genero: 'la',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Sonidos_animales/vaca.mp3"/>',
        Foto: "https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/vaca.jpeg",
        Colectivo: 'rebaño',
        FotoCol: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Animales/vacas.jpg'
    },
    
];

const transportes = [
    {
        Nombre: 'avión',
        Genero: 'el',
        Medio: 'aire',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/avion.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/avion.mp3"/>',
    },
    {
        Nombre: 'helicoptero',
        Genero: 'el',
        Medio: 'aire',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/helicoptero.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/helicoptero.mp3"/>',
    },
    {
        Nombre: 'cohete',
        Genero: 'el',
        Medio: 'aire',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/cohete.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/cohete.mp3"/>',
    },
    {
        Nombre: 'globo',
        Genero: 'el',
        Medio: 'aire',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/globo.jpeg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/globo.mp3"/>',
    },
    {
        Nombre: 'coche',
        Genero: 'el',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/coche.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/coche.mp3"/>',
    },
    {
        Nombre: 'camión',
        Genero: 'el',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/camion.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/camion.mp3"/>',
    },
    {
        Nombre: 'autobús',
        Genero: 'el',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/autobus.jpeg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/autobus.mp3"/>',
    },
    {
        Nombre: 'tren',
        Genero: 'el',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/tren.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/tren.mp3"/>',
    },
    {
        Nombre: 'bicicleta',
        Genero: 'la',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/bicicleta.jpeg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/bici.mp3"/>',
    },
    {
        Nombre: 'moto',
        Genero: 'la',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/moto.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/moto.mp3"/>',
    },
    {
        Nombre: 'tractor',
        Genero: 'el',
        Medio: 'tierra',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/tractor.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/tractor.mp3"/>',
    },
    {
        Nombre: 'barco',
        Genero: 'el',
        Medio: 'agua',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/barco.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/barco.mp3"/>',
    },
    {
        Nombre: 'submarino',
        Genero: 'el',
        Medio: 'agua',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/submarino.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/submarino.mp3"/>',
    },
    {
        Nombre: 'canoa',
        Genero: 'la',
        Medio: 'agua',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/canoa.jpg',
        Sonido: '<audio src="https://diviertetea.s3.eu-west-1.amazonaws.com/Transportes/piragua.mp3"/>',
    },
];


const lyn_N1 = [
    {
        Nombre: 'A',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/vocal2.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'B',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con5.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'C',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con8.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'D',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con5.jpg',
        Respuesta: 1,
    },
    {
        Nombre: 'E',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/vocal4.jpg',
        Respuesta: 4,
    },
    {
        Nombre: 'F',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con6.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'G',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con8.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'H',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con2.jpg',
        Respuesta: 1, 
    },
    {
        Nombre: 'I',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/vocal6.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'J',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con2.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'K',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con1.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'L',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con2.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'M',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con1.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'N',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con7.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'O',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/vocal3.jpg',
        Respuesta: 5,
    },
    {
        Nombre: 'P',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con1.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'Q',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con6.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'R',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con3.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'S',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con5.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'T',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con8.jpg',
        Respuesta: 1,
    },
    {
        Nombre: 'U',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/vocal4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'V',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'W',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con4.jpg',
        Respuesta: 1,
    },
    {
        Nombre: 'X',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con2.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'Y',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'Z',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/con4.jpg',
        Respuesta: 3,
    },
    {
        Nombre: '1',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num2.jpg',
        Respuesta: 1,
    },
    {
        Nombre: '2',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num4.jpg',
        Respuesta: 3,
    },
    {
        Nombre: '3',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num1.jpg',
        Respuesta: 1,
    },
    {
        Nombre: '4',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: '5',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num1.jpg',
        Respuesta: 4,
    },
    {
        Nombre: '6',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num3.jpg',
        Respuesta: 1,
    },
    {
        Nombre: '7',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: '8',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num3.jpg',
        Respuesta: 1,
    },
    {
        Nombre: '9',
        Pregunta: 'Cuántos',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/num2.jpg',
        Respuesta: 2,
    },
];

const lyn_N2 = [
   {
        Nombre: 'vocales',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix3.jpg',
        Respuesta: 4,
    },
    {
        Nombre: 'vocales',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix1.jpg',
        Respuesta: 3,
    },
    {
        Nombre: 'consonantes',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'consonantes',
        Pregunta: 'Cuántas',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix1.jpg',
        Respuesta: 6,
    },
    {
        Nombre: 'pares',
        Pregunta: 'Cuántos números',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix2.jpg',
        Respuesta: 4,
    },
    {
        Nombre: 'pares',
        Pregunta: 'Cuántos números',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix3.jpg',
        Respuesta: 1,
    },
    {
        Nombre: 'impares',
        Pregunta: 'Cuántos números',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix4.jpg',
        Respuesta: 2,
    },
    {
        Nombre: 'impares',
        Pregunta: 'Cuántos números',
        Foto: 'https://diviertetea.s3.eu-west-1.amazonaws.com/letrasynumeros/mix2.jpg',
        Respuesta: 5,
    },
];

module.exports = {
    animales,
    transportes,
    lyn_N1,
    lyn_N2
}