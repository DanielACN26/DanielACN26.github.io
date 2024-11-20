const textos = [
    "Andrezz descubrió su pasión por la música a los 10 años, componiendo con un cuatro tras cantar en el coro de su iglesia.",
    "En 2019 lanzó su carrera oficial, llevando su visión al siguiente nivel.",
    "Maestro del RnB, fusiona géneros como trap, reggae y drill, destacando en sus EPs ‘A.D.’ (2020) y ‘Nómada’ (2023)."
];

let index = 0; // Texto actual
let letterIndex = 0; // Índice de la letra actual
const textoElement = document.getElementById("texto-cambiando");

function escribirTexto() {
    let texto = textos[index]; // El texto actual
    if (letterIndex < texto.length) {
        textoElement.textContent += texto.charAt(letterIndex); // Agrega la siguiente letra
        letterIndex++;
        setTimeout(escribirTexto, 150); // Velocidad de escritura (150ms por letra)
    } else {
        // Espera 2 segundos antes de cambiar al siguiente texto
        setTimeout(() => {
            textoElement.style.opacity = 0; // Desvanece el texto
            setTimeout(() => {
                letterIndex = 0; // Reinicia el índice de letras
                index = (index + 1) % textos.length; // Cambia al siguiente texto
                textoElement.textContent = ""; // Limpia el contenido
                textoElement.style.opacity = 1; // Muestra el texto
                escribirTexto(); // Comienza a escribir el nuevo texto
            }, 900); // Tiempo para la transición de desvanecimiento
        }, 2000); // Tiempo para que el texto completo sea visible
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".logro-cifra");
    const options = {
        threshold: 0.2, // Activa la animación cuando esté visible al 20%
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Animando contador para:", entry.target);
                const counter = entry.target;

                const updateCount = () => {
                    const target = +counter.getAttribute("data-target");
                    const current = +counter.innerText.replace("+", ""); // Quita el "+" para calcular

                    const increment = Math.ceil(target / 100); // Ajusta los pasos

                    if (current < target) {
                        counter.innerText = `+${current + increment}`;
                        setTimeout(updateCount, 30); // Ajusta la velocidad
                    } else {
                        counter.innerText = `+${target}`; // Asegura que termina en el valor exacto
                    }
                };

                counter.classList.add("visible");
                updateCount();
                observer.unobserve(counter); // Deja de observar
            }
        });
    }, options);

    counters.forEach(counter => counterObserver.observe(counter));
});

document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('#presentacion video');
    if (video) {
        video.muted = true; // Asegura que el video esté silenciado
        video.play().catch((error) => {
            console.error('El video no pudo reproducirse automáticamente:', error);
        });
    }
});