import { HtmlHTMLAttributes } from 'react';

interface CardProps {
  children: HtmlHTMLAttributes<HTMLParagraphElement>['children'];

}

function Card({ children }: CardProps) {
  return (
    <div
      className="card m-auto shadow-sm p-3 mb-2 bg-white rounded"
      style={{ width: '100%' }}
    >
      <div className="card-body">
        <p className="card-text">{children}</p>
      </div>
    </div>

  );
}

export default Card;
