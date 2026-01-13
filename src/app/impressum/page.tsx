'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ImpressumPage() {
    return (
        <>
            <Header />

            <main style={{ paddingBlock: 'var(--space-16)', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 className="heading-2" style={{ marginBottom: 'var(--space-8)' }}>
                        Impressum
                    </h1>

                    <div style={{
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--gray-700)',
                    }}>
                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Angaben gemäß § 5 TMG
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            ProfilPro GmbH<br />
                            Seestraße 123<br />
                            83703 Gmund am Tegernsee<br />
                            Deutschland
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Kontakt
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Telefon: +49 (0) 8022 509 2122<br />
                            E-Mail: info@profilpro.de
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Vertretungsberechtigter Geschäftsführer
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Thomas Müller
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Registereintrag
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Handelsregister: Amtsgericht München<br />
                            Registernummer: HRB 123456
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Umsatzsteuer-Identifikationsnummer
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            gemäß §27 a Umsatzsteuergesetz:<br />
                            DE 123 456 789
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Thomas Müller<br />
                            Seestraße 123<br />
                            83703 Gmund am Tegernsee
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Streitschlichtung
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                            bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                                style={{ color: 'var(--primary-600)' }}>https://ec.europa.eu/consumers/odr</a>
                            <br /><br />
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                            Verbraucherschlichtungsstelle teilzunehmen.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Haftung für Inhalte
                        </h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                            Tätigkeit hinweisen.
                        </p>

                        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
                            Haftung für Links
                        </h2>
                        <p>
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                            der Seiten verantwortlich.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
