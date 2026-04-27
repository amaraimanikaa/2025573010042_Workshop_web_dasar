import "./style.css";

// Gunakan DOMContentLoaded agar script menunggu HTML selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // 1. Fungsi untuk sinkronisasi tema
  const applyTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // Jalankan saat pertama kali load
  applyTheme();

  // 2. Event Listener untuk Klik Tombol
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // Toggle class 'dark'
      html.classList.toggle("dark");

      // Simpan pilihan user ke localStorage
      if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  } else {
    console.error("Elemen dengan id 'theme-toggle' tidak ditemukan!");
  }
});
