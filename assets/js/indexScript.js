
document
    .querySelectorAll(".navbar-collapse .nav-link")
    .forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = e.target.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault(); // Evita el comportamiento predeterminado del enlace
                const section = document.querySelector(targetId);
                if (section) {
                    const navbarHeight = document.querySelector(".navbar").offsetHeight;
                    window.scroll({
                        top: section.offsetTop - navbarHeight, // Ajusta el desplazamiento según la altura de la barra de navegación
                        behavior: "smooth",
                    });
                    document
                        .querySelector(".navbar-collapse")
                        .classList.remove("show"); // Colapsa la barra de navegación en dispositivos móviles
                }
            }
        });
    });