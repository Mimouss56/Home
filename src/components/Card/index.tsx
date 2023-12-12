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
      <div className="bonnet" />
      <div className="card-body">
        <div className="card-text">{children}</div>
      </div>
    </div>

  );
}

export default Card;
