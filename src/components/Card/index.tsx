import { HtmlHTMLAttributes, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { userContext } from '../../store/user.context';

import 'dayjs/locale/fr';
import axiosInstance from '../../utils/axios';
import { ErrorSanctionProps } from '../../@types/error';
import { INews } from '../../@types/Home/news';
import SwitchButton from '../Form/Switch';

interface CardProps {
  children: HtmlHTMLAttributes<HTMLParagraphElement>['children'];
}

export function Card({ children }: CardProps) {
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

export function CardNews({ info }: { info: INews }) {
  const { user } = useContext(userContext);
  const [draft, setDraft] = useState(info.draft);
  const handleChangeDraft = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await axiosInstance.patch(`/api/home/news/${event.target.id}`, {
        draft: !draft,
      });
      setDraft(!draft);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  return (
    <div className="card mb-3 w-100">
      <div className="row g-0">
        <div className="col-md-4 p-3">
          <p className="fw-bold text-capitalize">{info.title}</p>
          <time
            className="fw-lighter text-body-secondary fst-italic text-capitalize "
            dateTime={dayjs(info.created_at).format('YYYY-MM-DD')}
          >
            {dayjs(info.created_at).locale('fr').format('MMMM D, YYYY')}
          </time>
          {user?.username === 'Mouss' && (
            <div className="d-flex flex-row ">
              <SwitchButton
                name="draft"
                active={!draft}
                onChange={handleChangeDraft}
                id={info.id.toString()}
                title="En ligne"
              />
            </div>

          )}

        </div>
        <div className="col-md-8">
          <div className="card-body">
            {user?.username === 'Mouss' && (
              <button
                type="button"
                className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
                data-bs-toggle="modal"
                data-bs-target="#addModalNews"
                data-bs-id={info.id}
                data-bs-edit="true"
                data-bs-type="portfolio"
              />
            )}
            { /* eslint-disable-next-line react/no-danger */}
            <p className="card-text" dangerouslySetInnerHTML={{ __html: info.content }} />
          </div>
        </div>
      </div>
    </div>

  );
}
