window.addEventListener("DOMContentLoaded", () => {
    let zema = document.getElementById("zema");
    let buttons = document.getElementsByClassName("button");
    let clean = document.getElementById("clean");
    let result = document.getElementById("result");
    let backspace = document.getElementById("backspace");

    // Fonction pour ajouter une valeur à l'affichage
    function addToDisplay(value) {
        zema.value += value;
    }
    // Fonction pour effacer l'affichage
    function clearDisplay() {
        zema.value = "";
    }
      // Fonction pour évaluer l'expression mathématique
      function evaluateExpression() {
        let calculResult = zema.value;
        // Vérifie si l'expression est valide
        if (/^[0-9+\-*/.() ]+$/.test(calculResult)) {
            try {
                // Utilise la fonction Function pour évaluer l'expression en toute sécurité
                let evaluateExpression = new Function('return ' + calculResult);
                let resultat = evaluateExpression();
                // Traite le résultat (supprime le signe égal s'il existe)
                if (typeof resultat === 'string') {
                    resultat = resultat.endsWith('=') ? resultat.slice(0, -1) : resultat;
                }

                // Affiche le résultat
                zema.value = resultat;
                // Efface l'affichage après 3000 millisecondes (3 secondes)
                setTimeout(() => {
                    clearDisplay();
                }, 3000);
            } catch (error) {
                // Gère les erreurs d'évaluation
                console.error("Erreur", error);
                zema.value = "Erreur"  // Affiche l'erreur dans l'élément d'affichage
            }
        } else {
            // Gère le cas d'une expression invalide
            console.error("Expression invalide");
            zema.value = "Erreur: Expression invalide";
        }
    }
    // Fonction pour supprimer un caractère à gauche du curseur
    function backspaceDisplay() {
        let cursorPosition = zema.selectionStart;
        let currentValue = zema.value;

        // supprime le caractère à gauche du curseur
        if (cursorPosition > 0 && currentValue.slice(cursorPosition - 1, cursorPosition) === "s") {
            let newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
            zema.value = newValue;
            zema.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        } else if (cursorPosition > 0) {
            // Sinon, supprime normalement
            let newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
            zema.value = newValue;
            zema.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        } else if (cursorPosition === 0 && currentValue.length > 0) {
            // Si le curseur est au début, supprime le premier caractère
            zema.value = currentValue.slice(1);
        }
    }

    // Ajoute des écouteurs d'événements pour chaque bouton
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let buttonValue = this.value;

            // Si le bouton est "=" (égal), évaluez l'expression et affichez le résultat
            if (buttonValue === "=") {
                evaluateExpression();
            } else if (buttonValue === "c") {
                // Si le bouton est "c" (effacer), effacez l'affichage
                clearDisplay();
            } else if (buttonValue === "s") {
                // Si le bouton est "s" (effacer un caractère), supprimez le dernier caractère
                backspaceDisplay();
            } else {
                // Sinon, ajoutez la valeur du bouton à l'affichage
                addToDisplay(buttonValue);
            }
        });
    }

    // Ajoute un écouteur d'événement pour le bouton de nettoyage (C)
    clean.addEventListener("click", () => {
        clearDisplay();
    });

    // Ajoute un écouteur d'événement pour les touches du clavier
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        console.log("Key pressed: ", key);

        // Vérifie si la touche appuyée est une touche valide pour la calculatrice
        if (/^[0-9+\-*//* . *//* ()=]$/.test(key)) {
            event.preventDefault();

            // Si la touche est "=", évalue l'expression
            if (key === "=") {
                evaluateExpression();
            } else {
                // Sinon, ajoute la touche à l'affichage
                addToDisplay(key);
            }
        } else if (key === "Delete") {
            // Si la touche est "Delete", efface l'affichage
            event.preventDefault();
            clearDisplay();
        } else if (key === "ArrowLeft" || key === "Backspace") {
            // Si la touche est "ArrowLeft" (flèche gauche) ou "Backspace", supprime un caractère à gauche du curseur
            event.preventDefault();
            backspaceDisplay();
            console.log("Key pressed: Backspace");
        }
    });
});
