import { HtmlHTMLAttributes } from 'react';

interface CardProps {
  children: HtmlHTMLAttributes<HTMLParagraphElement>['children'];

}

function Card({ children }: CardProps) {
  return (
    <div
      className="card shadow-sm p-1 bg-white rounded w-100 mb-2"
    >
      <div className="card-body">
        <div className="card-text">{children}</div>
      </div>
    </div>

  );
}

export default Card;
