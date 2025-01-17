// Configuration du thème
const THEME_KEY = 'app-theme';

// Fonction pour gérer le changement de thème
function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Mettre à jour l'icône
    document.querySelector('.dark').style.display = newTheme === 'dark' ? 'none' : 'block';
    document.querySelector('.light').style.display = newTheme === 'dark' ? 'block' : 'none';
}

// Initialisation du thème au chargement
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Afficher la bonne icône
    document.querySelector('.dark').style.display = savedTheme === 'dark' ? 'none' : 'block';
    document.querySelector('.light').style.display = savedTheme === 'dark' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const themeToggles = document.querySelectorAll('.dark, .light');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
})