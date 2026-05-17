import type { ContactStatsData } from '../../../types/contacts.types';
import './ContactsStats.css';

interface ContactsStatsProps {
  stats: ContactStatsData;
}

const ContactsStats = ({ stats }: ContactsStatsProps) => {
  return (
    <section className="stats-grid">
      <article className="stats-card">
        <p>Total Contactos</p>
        <h2>{stats.total}</h2>
      </article>

      <article className="stats-card">
        <p>Contactado</p>
        <h2 className="activos">{stats.activos}</h2>
      </article>

      <article className="stats-card">
        <p>No Contactado</p>
        <h2 className="inactivos">{stats.inactivos}</h2>
      </article>
    </section>
  );
};

export default ContactsStats;
