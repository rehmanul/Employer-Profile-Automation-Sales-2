'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function DatenschutzPage() {
    return (
        <>
            <Header />

            <main style={{ paddingBlock: 'var(--space-16)', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 className="heading-2" style={{ marginBottom: 'var(--space-8)' }}>
                        Datenschutzerklärung
                    </h1>

                    <div style={{
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--gray-700)',
                    }}>
                        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-8)' }}>
                            Stand: Januar 2026
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            1. Verantwortlicher
                        </h2>
                        <p>
                            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
                            ProfilPro GmbH<br />
                            Seestraße 123<br />
                            83703 Gmund am Tegernsee<br />
                            Deutschland<br /><br />
                            E-Mail: datenschutz@profilpro.de
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            2. Erhobene Daten
                        </h2>
                        <p style={{ marginBottom: 'var(--space-3)' }}>
                            <strong>2.1 Bei der Nutzung unserer Dienste:</strong><br />
                            - Unternehmenswebsite-URL<br />
                            - Jobtitel<br />
                            - E-Mail-Adresse<br />
                            - Telefonnummer (optional)<br />
                            - Rechnungsadresse (bei Bestellungen)
                        </p>
                        <p>
                            <strong>2.2 Automatisch erfasste Daten:</strong><br />
                            - IP-Adresse<br />
                            - Browser-Typ und -Version<br />
                            - Geräteinformationen<br />
                            - Zugriffszeitpunkt
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            3. Zweck der Datenverarbeitung
                        </h2>
                        <p>
                            Wir verarbeiten Ihre Daten für folgende Zwecke:<br />
                            - Erstellung von Unternehmensprofilen und Stellenanzeigen<br />
                            - Kommunikation bezüglich Ihrer Bestellung<br />
                            - Rechnungsstellung und Zahlungsabwicklung<br />
                            - Verbesserung unserer Dienste<br />
                            - Erfüllung rechtlicher Pflichten
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            4. Rechtsgrundlage
                        </h2>
                        <p>
                            Die Verarbeitung erfolgt auf Grundlage von:<br />
                            - Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)<br />
                            - Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)<br />
                            - Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            5. Datenweitergabe
                        </h2>
                        <p>
                            Ihre Daten werden an folgende Kategorien von Empfängern weitergegeben:<br />
                            - Zahlungsdienstleister (Stripe) für die Zahlungsabwicklung<br />
                            - Hosting-Anbieter (Vercel) für den Betrieb der Plattform<br />
                            - KI-Dienste (Google Gemini) für die Content-Generierung<br /><br />
                            Alle Dienstleister sind vertraglich zur Einhaltung der DSGVO verpflichtet.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            6. Speicherdauer
                        </h2>
                        <p>
                            Wir speichern Ihre Daten nur solange, wie es für die jeweiligen Zwecke
                            erforderlich ist oder gesetzliche Aufbewahrungsfristen dies erfordern
                            (in der Regel 6-10 Jahre für Rechnungsdaten).
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            7. Ihre Rechte
                        </h2>
                        <p>
                            Sie haben folgende Rechte bezüglich Ihrer Daten:<br />
                            - Recht auf Auskunft (Art. 15 DSGVO)<br />
                            - Recht auf Berichtigung (Art. 16 DSGVO)<br />
                            - Recht auf Löschung (Art. 17 DSGVO)<br />
                            - Recht auf Einschränkung (Art. 18 DSGVO)<br />
                            - Recht auf Datenübertragbarkeit (Art. 20 DSGVO)<br />
                            - Widerspruchsrecht (Art. 21 DSGVO)<br /><br />
                            Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter datenschutz@profilpro.de
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            8. Cookies
                        </h2>
                        <p>
                            Wir verwenden nur technisch notwendige Cookies für den Betrieb der Website.
                            Marketing-Cookies werden erst nach Ihrer ausdrücklichen Einwilligung gesetzt.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            9. Beschwerderecht
                        </h2>
                        <p>
                            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
                            wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
