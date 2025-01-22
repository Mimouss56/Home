import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  useCallback, useEffect, useState,
} from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

import { ISanction } from '../../../@types/Home/sanction';
import useMeStore from '../../../store/me.store';
import useSanctionStore from '../../../store/sanction.store';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

function ModalViewDetails() {
  const { sanctions } = useSanctionStore((state) => state);

  const [sanction, setSanction] = useState<ISanction>({} as ISanction);
  const { me: user } = useMeStore((state) => state);

  const retrieveSanction = useCallback((id: number): ISanction | null => {
    const dataSanction = sanctions.find((oneSanction) => oneSanction.id === id);
    if (!dataSanction) return null;
    return dataSanction;
  }, [sanctions]);

  useEffect(() => {
    const addItemModal = document.getElementById('modalViewSanction');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        if (Number(idModal) !== 0) {
          const sanctionRetrived = retrieveSanction(Number(idModal));
          if (sanctionRetrived) setSanction(sanctionRetrived);
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [retrieveSanction, user]);

  return (
    <div className="modal fade" id="modalViewSanction">
      <div className="modal-dialog modal-dialog-centered ">
        <div
          className={`modal-content ${sanction.warn ? 'bg-danger-subtle' : 'bg-warning-subtle'} bg-gradient text-dark`}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Détails de la sanction
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {sanction.warn && <span className="badge text-bg-danger rounded-pill ">Important</span>}
            <p>{sanction.label}</p>
            <p className="text-end fst-italic m-0">
              {`Par : ${sanction.author?.username}`}
            </p>
            <p className="text-end fst-italic m-0">
              {`le ${dayjs(sanction.created_at).locale('fr').format('LLLL')}`}
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-around ">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalViewDetails;
