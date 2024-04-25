import { IUser } from '../@types/Home/user';

interface SectionLayoutProps {
  idName: string;
  title: string;
  addButton: string | null;
  children: React.ReactNode;
}
function SectionLayout({
  idName, title, addButton, children,
}: SectionLayoutProps) {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const isMouss = (userSession?.username === 'Mouss');
  const nav = document.getElementById('nav-bar');

  return (
    <section
      className="d-flex justify-content-center flex-column"
      id={idName}
    >
      <div
        className="d-flex justify-content-between w-100 mx-auto border-1 border-top border-bottom p-2 bg-secondary position-sticky z-1 "
        id={`${idName}-header`}
        style={{
          // top en dessous de la navbar
          top: nav?.offsetHeight,
        }}
      >
        <h2>{title}</h2>
        {addButton && isMouss && (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${addButton}`}
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
