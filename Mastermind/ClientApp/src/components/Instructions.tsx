import React from 'react';

export default function Instructions() {
    return (
        <aside className="bg-light p-5">
            <h2>Instructies</h2>
            <p>
                Raad de geheime code in zo min mogelijk pogingen. Je hebt maximaal 10 kansen om de code na te maken door de juiste kleuren
                in de juiste volgorde te zetten. De code bestaat uit 4 pinnen in iedere gewenste combinatie van de 6 kleuren. Je mag 2 of meer
                pinnen van dezelfde kleur gebruiken. Na het kiezen van 4 kleuren kan je de code controleren met de check knop, dan wordt de score
                weergegeven in de kleine cirkels rechts van de rij. Zwart betekend de juiste kleur op de juiste positie, wit betekend de juiste
                kleur op de verkeerde positie.
            </p>
            Sneltoetsen:
            <ul>
                <li><strong>1-6</strong>: kleur kiezen</li>
                <li><strong>Esc</strong>: kleur weghalen</li>
                <li><strong>Enter</strong>: check de kleuren</li>
            </ul>
        </aside>
    );
}