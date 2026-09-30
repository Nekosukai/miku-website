document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("globalNav");
  const menu = document.getElementById("menuToggle");
  const glow = document.getElementById("cursorGlow");
  const loader = document.getElementById("loader");

  // Loading animation
  if (loader) {
    let progress = 0;
    const percent = loader.querySelector(".loader__percent");
    const bar = loader.querySelector(".loader__bar span");
    const timer = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 4;
      progress = Math.min(progress, 100);
      if (percent) percent.textContent = String(progress).padStart(2, "0") + "%";
      if (bar) bar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => loader.classList.add("is-hidden"), 300);
      }
    }, 70);
  }

  // Fixed translucent navigation
  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Mouse glow
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      glow.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 450, fill: "forwards", easing: "ease-out" }
      );
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Lightweight parallax
  const parallax = document.querySelectorAll("[data-parallax]");
  if (parallax.length && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      parallax.forEach(el => {
        const speed = Number(el.dataset.parallax) || 0;
        el.style.transform = `translate3d(0, ${y * speed * -1}px, 0) scale(1.04)`;
      });
    }, { passive: true });
  }

  // Card tilt effect
  if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Tiny digital glitch on page title
  const title = document.querySelector(".page-hero h1, .hero__title");
  if (title) {
    setInterval(() => {
      if (Math.random() > 0.65) {
        title.style.transform = `translateX(${Math.random() * 3 - 1.5}px)`;
        setTimeout(() => title.style.transform = "", 80);
      }
    }, 1700);
  }
});
