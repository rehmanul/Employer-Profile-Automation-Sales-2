'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AGBPage() {
    return (
        <>
            <Header />

            <main style={{ paddingBlock: 'var(--space-16)', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 className="heading-2" style={{ marginBottom: 'var(--space-8)' }}>
                        Allgemeine Geschäftsbedingungen
                    </h1>

                    <div style={{
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--gray-700)',
                    }}>
                        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-8)' }}>
                            Stand: Januar 2026
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            1. Geltungsbereich
                        </h2>
                        <p>
                            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen ProfilPro
                            (nachfolgend "Anbieter") und dem Kunden über die Nutzung der auf dieser Plattform
                            angebotenen Dienstleistungen zur automatisierten Erstellung von Unternehmensprofilen
                            und Stellenanzeigen.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            2. Vertragsgegenstand
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            2.1 Der Anbieter stellt eine Plattform zur Verfügung, die mittels Künstlicher
                            Intelligenz automatisch Unternehmensprofil und Stellenanzeigen auf Basis von
                            Website-Analysen erstellt.
                        </p>
                        <p>
                            2.2 Die erstellten Inhalte können vom Kunden vor der Veröffentlichung bearbeitet
                            werden. Der Kunde ist für die finale Überprüfung und Freigabe der Inhalte verantwortlich.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            3. Vertragsschluss
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            3.1 Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich
                            bindendes Angebot dar, sondern eine Aufforderung zur Abgabe eines Angebots.
                        </p>
                        <p>
                            3.2 Der Vertrag kommt durch die Annahme des Angebots des Kunden durch den Anbieter
                            zustande. Dies erfolgt durch Bestätigung per E-Mail oder Freischaltung des Dienstes.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            4. Preise und Zahlung
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            4.1 Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Alle Preise
                            verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
                        </p>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            4.2 Die Zahlung erfolgt wahlweise per Kreditkarte oder auf Rechnung mit einem
                            Zahlungsziel von 14 Tagen.
                        </p>
                        <p>
                            4.3 Bei Nichtzahlung behält sich der Anbieter das Recht vor, die Stellenanzeige
                            zu deaktivieren.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            5. Laufzeit und Kündigung
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            5.1 Stellenanzeigen werden für die gebuchte Laufzeit (Standard: 30 Tage) veröffentlicht.
                        </p>
                        <p>
                            5.2 Eine vorzeitige Kündigung durch den Kunden ist möglich, begründet jedoch
                            keinen Anspruch auf Rückerstattung des Kaufpreises.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            6. Haftung
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            6.1 Der Anbieter haftet unbeschränkt für vorsätzlich oder grob fahrlässig
                            verursachte Schäden.
                        </p>
                        <p>
                            6.2 Für KI-generierte Inhalte übernimmt der Anbieter keine Haftung für
                            inhaltliche Richtigkeit. Der Kunde ist verpflichtet, die Inhalte vor
                            Veröffentlichung zu prüfen.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            7. Schlussbestimmungen
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            7.1 Es gilt das Recht der Bundesrepublik Deutschland.
                        </p>
                        <p>
                            7.2 Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit
                            der übrigen Bestimmungen unberührt.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
