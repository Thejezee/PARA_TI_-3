function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);

    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 360;
    const scale = 0.5 + Math.random() * 0.5;

    heart.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg) scale(${scale})`;
    heart.style.opacity = '0';

    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

function createHeartExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(x, y);
        }, i * 50);
    }
}

const mensajesPorSeccion = {
    'historia': "Cada día que pasa me enamoro más de nuestra historia juntos ❤️",
    'momentos': "Cada momento contigo es un tesoro que guardaré por siempre 💑",
    'mejor-foto': "Esta foto captura la esencia de nuestro amor 📸",
    'playlist': "Nuestra música, nuestros recuerdos, nuestro amor 🎵",
    'mensaje': "Te amo más de lo que las palabras pueden expresar 💖"
};

function mostrarMensaje(mensaje) {
    let mensajeContainer = document.getElementById('mensaje-flotante');
    if (!mensajeContainer) {
        mensajeContainer = document.createElement('div');
        mensajeContainer.id = 'mensaje-flotante';
        document.body.appendChild(mensajeContainer);
    }

    mensajeContainer.textContent = mensaje;
    mensajeContainer.classList.add('mostrar');

    setTimeout(() => {
        mensajeContainer.classList.remove('mostrar');
    }, 3000);
}

function inicializarBotones() {
    const secciones = ['historia', 'momentos', 'mejor-foto', 'playlist', 'mensaje'];
    
    secciones.forEach(seccion => {
        const seccionElement = document.getElementById(seccion);
        if (seccionElement) {
            const boton = document.createElement('button');
            boton.className = 'boton-amor';
            boton.textContent = '💝 Click Aquí 💝';
            
            const contenido = seccionElement.querySelector('.section-content');
            const titulo = contenido.querySelector('h2');
            titulo.parentNode.insertBefore(boton, titulo.nextSibling);

            boton.addEventListener('click', (e) => {
                const rect = boton.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                createHeartExplosion(x, y);

                mostrarMensaje(mensajesPorSeccion[seccion]);
            });
        }
    });
}

const estilos = `
    .heart {
        position: fixed;
        pointer-events: none;
        width: 20px;
        height: 20px;
        background: red;
        transform-origin: center;
        transition: all 1s ease;
        clip-path: path('M10,4.1c2.8-5,7.8-4.6,9.9-1.8c2.5,3.2,1.5,8.2-2.3,11.7C15,16.2,12,18.4,10,20c-2-1.6-5-3.8-7.6-6C-1.4,10.5-2.4,5.5,0.1,2.3C2.2-0.5,7.2-0.9,10,4.1z');
    }

    .boton-amor {
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        margin: 10px 0;
        transition: transform 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .boton-amor:hover {
        transform: scale(1.05);
    }

    #mensaje-flotante {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: transform 0.3s ease;
        text-align: center;
        font-size: 18px;
        color: #333;
    }

    #mensaje-flotante.mostrar {
        transform: translate(-50%, -50%) scale(1);
    }
`;

function agregarEstilos() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', () => {
    agregarEstilos();
    inicializarBotones();
});