document.addEventListener("DOMContentLoaded", function() {
    // Gère les clics sur les éléments toggle pour ouvrir/fermer les sous-listes
    document.querySelectorAll('.toggle').forEach(function(el) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            var nestedList = this.nextElementSibling;
            if (nestedList && nestedList.classList.contains('nested')) {
                nestedList.classList.toggle('active');
            }
        });
    });

    // Gère les clics sur les éléments espece pour afficher les popups
    document.querySelectorAll('.espece').forEach(function(el) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            var popupId = this.getAttribute('data-popup-target');
            var popup = document.getElementById(popupId);
            if (popup) {
                popup.style.display = 'block';
            }
        });
    });

    // Gère les clics sur les boutons de fermeture des popups
    document.querySelectorAll('.close-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var popup = btn.closest('.popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });

    // Ferme les popups si on clique en dehors
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.popup').forEach(function(popup) {
            if (event.target == popup) {
                popup.style.display = 'none';
            }
        });
    });

    let translations = {};
    let currentLanguage = 'biological'; // Initialisation avec termes biologiques

    // Charger les traductions depuis le fichier JSON
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
        })
        .catch(error => console.error('Error loading translations:', error));

    document.getElementById('language-toggle').addEventListener('click', function() {
        const button = this;
        const elements = document.querySelectorAll('[data-key]');
        const isBiological = currentLanguage === 'biological';

        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                element.textContent = isBiological ? translations[key] : key;
            }
        });

        button.textContent = isBiological ? 'Français' : 'Termes Biologiques';
        currentLanguage = isBiological ? 'french' : 'biological';
    });
});



