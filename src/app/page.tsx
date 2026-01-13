'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Globe,
  Palette,
  FileText,
  CreditCard,
  Check,
  Star,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  Building2,
  Target,
  MessageSquare,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, FeatureCard } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background" />
        <div className="hero-pattern" />
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="container">
          <div className="hero-content" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'center',
          }}>
            <div className="stagger">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-6)',
                backdropFilter: 'blur(10px)',
              }}>
                <Sparkles size={16} style={{ color: 'var(--accent-400)' }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  KI-gestützte Automatisierung
                </span>
              </div>

              <h1 className="hero-title">
                Professionelle Profile & Stellenanzeigen in{' '}
                <span style={{
                  background: 'linear-gradient(135deg, var(--accent-300), var(--accent-500))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Minuten
                </span>
              </h1>

              <p className="hero-subtitle">
                Geben Sie einfach Ihre Unternehmenswebsite ein – unsere KI analysiert
                Ihre Marke und erstellt überzeugende Unternehmensprofile und
                Stellenanzeigen automatisch.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/create" style={{ textDecoration: 'none' }}>
                  <Button variant="gradient" size="xl" rightIcon={ArrowRight}>
                    Kostenlos starten
                  </Button>
                </Link>
                <Link href="#demo" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="secondary"
                    size="xl"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    Demo ansehen
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div style={{
                marginTop: 'var(--space-8)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'var(--text-sm)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Check size={16} style={{ color: 'var(--success-400)' }} />
                  <span>Kostenlos testen</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Check size={16} style={{ color: 'var(--success-400)' }} />
                  <span>Keine Installation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Check size={16} style={{ color: 'var(--success-400)' }} />
                  <span>DSGVO-konform</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hide-mobile" style={{
              position: 'relative',
              padding: 'var(--space-8)',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 'var(--space-6)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}>
                {/* Mockup of profile card */}
                <div style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  color: 'var(--gray-900)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'linear-gradient(135deg, var(--primary-500), var(--accent-400))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Building2 size={28} color="white" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                        Ihr Unternehmen
                      </h4>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                        Automatisch generiert
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--gray-600)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>
                    Wir sind ein innovatives Unternehmen, das mit Leidenschaft
                    an zukunftsweisenden Lösungen arbeitet...
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {['Teamgeist', 'Innovation', 'Qualität'].map(tag => (
                      <span key={tag} style={{
                        padding: 'var(--space-1) var(--space-3)',
                        background: 'var(--primary-50)',
                        color: 'var(--primary-600)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  background: 'var(--success-500)',
                  color: 'white',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-lg)',
                  animation: 'float 3s ease-in-out infinite',
                }}>
                  ✨ In 60 Sekunden fertig
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'white',
        paddingBlock: 'var(--space-12)',
        borderBottom: '1px solid var(--gray-100)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-8)',
            textAlign: 'center',
          }}>
            {[
              { value: '500+', label: 'Erstellte Profile', icon: Building2 },
              { value: '98%', label: 'Zufriedenheit', icon: Star },
              { value: '< 2min', label: 'Durchschnittl. Zeit', icon: Clock },
              { value: '50%', label: 'Mehr Bewerbungen', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="stat">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)', maxWidth: '700px', marginInline: 'auto' }}>
            <p className="caption" style={{ marginBottom: 'var(--space-3)' }}>Funktionen</p>
            <h2 className="heading-2">
              Alles was Sie brauchen, <span className="gradient-text">automatisiert</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginTop: 'var(--space-4)' }}>
              Von der Website-Analyse bis zur fertigen Stellenanzeige –
              unsere KI übernimmt den kompletten Prozess.
            </p>
          </div>

          <div className="grid-3 gap-6 stagger">
            <FeatureCard
              icon={Globe}
              title="Website-Analyse"
              description="Automatische Extraktion von Logo, Farben, Texten und Kontaktdaten von Ihrer Unternehmenswebsite."
            />
            <FeatureCard
              icon={Palette}
              title="Marken-Erkennung"
              description="Präzise Erkennung Ihrer Corporate Identity inklusive Logos und Markenfarben via Brandfetch."
            />
            <FeatureCard
              icon={Sparkles}
              title="KI-Textgenerierung"
              description="Gemini AI erstellt überzeugende 'Über uns'-Texte und Stellenanzeigen in Ihrem Stil."
            />
            <FeatureCard
              icon={FileText}
              title="Stellenanzeigen"
              description="Professionelle Stellenanzeigen mit Aufgaben, Anforderungen und Benefits - sofort einsatzbereit."
            />
            <FeatureCard
              icon={Target}
              title="Zielgruppen-optimiert"
              description="Texte werden für Ihre Zielgruppe und Branche optimiert - für maximale Wirkung."
            />
            <FeatureCard
              icon={Shield}
              title="DSGVO-konform"
              description="Vollständige Datenschutzkonformität. Ihre Daten werden sicher in der EU gehostet."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="caption" style={{ marginBottom: 'var(--space-3)' }}>So funktioniert's</p>
            <h2 className="heading-2">In 3 einfachen Schritten zum Profil</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-8)',
          }}>
            {[
              {
                step: '01',
                title: 'Website eingeben',
                description: 'Geben Sie einfach Ihre Unternehmenswebsite und den gewünschten Jobtitel ein.',
                icon: Globe,
              },
              {
                step: '02',
                title: 'KI arbeitet',
                description: 'Unsere KI analysiert Ihre Website und erstellt Profil und Stellenanzeige automatisch.',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Veröffentlichen',
                description: 'Prüfen, anpassen und veröffentlichen Sie Ihre Inhalte mit einem Klick.',
                icon: CreditCard,
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto var(--space-6)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-100), var(--accent-100))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <item.icon size={32} style={{ color: 'var(--primary-600)' }} />
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                  }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--muted)', lineHeight: 'var(--leading-relaxed)' }}>
                  {item.description}
                </p>

                {/* Connector line */}
                {i < 2 && (
                  <div className="hide-mobile" style={{
                    position: 'absolute',
                    top: '40px',
                    right: '-30%',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary-200), var(--accent-200))',
                  }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <Button variant="gradient" size="lg" rightIcon={ArrowRight}>
                Jetzt ausprobieren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="caption" style={{ marginBottom: 'var(--space-3)' }}>Preise</p>
            <h2 className="heading-2">Transparente Preisgestaltung</h2>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginTop: 'var(--space-4)' }}>
              Starten Sie kostenlos oder veröffentlichen Sie Ihre Stellenanzeige direkt.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Free Plan */}
            <Card className="pricing-card">
              <p className="pricing-title">Profil erstellen</p>
              <div className="pricing-price">
                Kostenlos
                <span className="pricing-period"></span>
              </div>
              <ul className="pricing-features">
                {[
                  'Unternehmensprofil Vorschau',
                  'KI-generierte Texte',
                  'Logo & Farben Erkennung',
                  'Bearbeitungsmöglichkeit',
                  'PDF Export',
                ].map((feature, i) => (
                  <li key={i} className="pricing-feature">
                    <Check size={18} className="pricing-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create?plan=free" style={{ textDecoration: 'none', display: 'block' }}>
                <Button variant="secondary" fullWidth size="lg">
                  Kostenlos starten
                </Button>
              </Link>
            </Card>

            {/* Premium Plan */}
            <Card className="pricing-card pricing-popular">
              <span className="pricing-badge">Beliebt</span>
              <p className="pricing-title">Stellenanzeige veröffentlichen</p>
              <div className="pricing-price">
                €299
                <span className="pricing-period"> / Anzeige</span>
              </div>
              <ul className="pricing-features">
                {[
                  'Alles aus dem kostenlosen Plan',
                  'Stellenanzeige Erstellung',
                  'Veröffentlichung auf Jobbörse',
                  '30 Tage Laufzeit',
                  'Bewerber-Benachrichtigungen',
                  'Rechnung mit USt-Ausweis',
                ].map((feature, i) => (
                  <li key={i} className="pricing-feature">
                    <Check size={18} className="pricing-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create?plan=premium" style={{ textDecoration: 'none', display: 'block' }}>
                <Button variant="gradient" fullWidth size="lg">
                  Jetzt veröffentlichen
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-900), var(--primary-800))',
        paddingBlock: 'var(--space-20)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-glow hero-glow-1" style={{ opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            color: 'white',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 700,
              marginBottom: 'var(--space-4)',
            }}>
              Bereit, Ihr Profil zu erstellen?
            </h2>
            <p style={{
              fontSize: 'var(--text-lg)',
              opacity: 0.9,
              marginBottom: 'var(--space-8)',
            }}>
              Schließen Sie sich hunderten von Unternehmen an, die bereits
              professionelle Profile mit ProfilPro erstellt haben.
            </p>
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <Button
                size="xl"
                rightIcon={ArrowRight}
                style={{
                  background: 'white',
                  color: 'var(--primary-700)',
                }}
              >
                Kostenlos starten
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
