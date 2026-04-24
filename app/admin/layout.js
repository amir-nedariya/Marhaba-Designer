import AdminClientLayout from './AdminClientLayout';

export const metadata = {
  title: 'Marhaba | Admin Dashboard',
  description: 'Manage your portfolio and agency projects with ease.',
}

export default function AdminLayout({ children }) {
  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  );
}
