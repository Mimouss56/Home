/* eslint-disable jsx-a11y/anchor-is-valid */
interface BadgeProps {
  name: string;
}

function Badge({ name }: BadgeProps) {
  return (
    <span className="badge d-flex align-items-center m-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill">
      {name}
      <span className="vr mx-2" />
      <a
        href="#"
      >
        <i className="bi bi-x-circle-fill text-dark" />
      </a>
    </span>
  );
}

export default Badge;
