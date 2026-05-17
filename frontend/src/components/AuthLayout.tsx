import type { ReactNode } from 'react';

interface AuthLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ badge, title, subtitle, children }: AuthLayoutProps) => {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card__header">
          <span className="auth-badge">{badge}</span>
          <h1 id="auth-title">{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
