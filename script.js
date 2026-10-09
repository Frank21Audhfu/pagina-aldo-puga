<script>
// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('ocultar');
    }
});

// Evento Scroll: barra de progreso, navbar, botón arriba, animaciones reveal
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Barra de progreso
    const progreso = document.getElementById('scrollProgress');
    if (progreso) {
        progreso.style.width = (winScroll / height) * 100 + '%';
    }

    // Navbar efecto
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Botón Volver Arriba — aparece/desaparece
    const btnArriba = document.getElementById('btnVolverArriba');
    if (btnArriba) {
        if (window.scrollY > 400) {
            btnArriba.classList.add('visible');
        } else {
            btnArriba.classList.remove('visible');
        }
    }

    // Animaciones de revelado
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('activo');
        }
    });
});

// Al cargar el DOM: menú, video, botón arriba, contadores
document.addEventListener("DOMContentLoaded", () => {
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('activo');
        });
    }

    // Reproducir video del hero
    const heroVideo = document.getElementById("heroVideo");
    if (heroVideo) {
        heroVideo.play().catch(e => console.log("Autoplay con restricciones:", e));
    }

    // Acción al hacer clic en el botón Volver Arriba
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    if (btnVolverArriba) {
        btnVolverArriba.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contadores numéricos dinámicos
    const contadores = document.querySelectorAll('.metrica-valor');
    let ejecutado = false;
    window.addEventListener('scroll', () => {
        const seccion = document.querySelector('.seccion-metricas');
        if (!seccion) return;
        if (seccion.getBoundingClientRect().top < window.innerHeight && !ejecutado) {
            contadores.forEach(contador => {
                const objetivo = parseInt(contador.getAttribute('data-valor'));
                let actual = 0;
                const incremento = Math.ceil(objetivo / 30);
                const timer = setInterval(() => {
                    actual += incremento;
                    if (actual >= objetivo) {
                        contador.innerText = '+' + objetivo;
                        clearInterval(timer);
                    } else {
                        contador.innerText = '+' + actual;
                    }
                }, 40);
            });
            ejecutado = true;
        }
    });

    // ✅ Lightbox para imágenes de Proyectos (agregado para tu página)
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <button class="lightbox-cerrar" id="cerrarLightbox">&times;</button>
        <img src="" alt="" class="lightbox-contenido" id="imagenLightbox">
    `;
    document.body.appendChild(lightbox);

    const imagenLightbox = document.getElementById('imagenLightbox');
    const cerrarLightbox = document.getElementById('cerrarLightbox');

    document.querySelectorAll('.proyecto-img-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img') || item.querySelector('img')?.src;
            if (imgSrc) {
                imagenLightbox.src = imgSrc;
                lightbox.classList.add('activo');
            }
        });
    });

    cerrarLightbox?.addEventListener('click', () => {
        lightbox.classList.remove('activo');
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('activo');
        }
    });
});
</script>