import { useContext } from 'react';
import { userContext } from '../store/user.context';

interface SectionLayoutProps {
  idName: string;
  title: string;
  addButton: string | null;
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}
function SectionLayout({
  idName, title, addButton, children, className,
}: SectionLayoutProps) {
  const { user } = useContext(userContext);
  const isMouss = (user?.username === 'Mouss');
  const nav = document.getElementById('nav-bar');

  return (
    <section
      className={`d-flex justify-content-center flex-column ${className || ''}`}
      id={idName}
    >
      <div
        className="d-flex justify-content-between w-100 mx-auto border-1 border-info-subtle border-top border-bottom p-2 bg-secondary position-sticky z-2"
        id={`${idName}-header`}
        style={{
          // top en dessous de la navbar
          top: nav?.offsetHeight,
        }}
      >
        <h2 style={{
          color: '#50dfdb',
        }}
        >
          {title}
        </h2>
        {addButton && isMouss && (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${addButton}`}
            data-bs-type={idName}
          >
            Ajout d&apos;un item
          </button>
        )}

      </div>
      {children}
    </section>
  );
}

export default SectionLayout;
