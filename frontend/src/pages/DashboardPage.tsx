import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ContactsPage from './ContactsPage';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      '¿Seguro que quieres cerrar sesión?'
    );
    if (!confirmLogout) return;

    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="dashboard-shell">

      <section className="dashboard-card">
        <div className='badge-session'>
          <span className="auth-badge">Sesión activa</span>
          <button className="button button--secondary" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
        <div>
        </div>
        <div className='profile-container'>
          <article className="profile-item">
            <span>Nombre</span>
            <strong>{user?.name || "No hay nombre"}</strong>
          </article>
          <article className="profile-item profile-item--wide">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </article>
        </div>
        <div>
          <ContactsPage />
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
