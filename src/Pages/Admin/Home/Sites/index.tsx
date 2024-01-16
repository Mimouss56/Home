import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';
import { ErrorAxios, ErrorSanctionProps } from '../../../../@types/error';
import ISites from '../../../../@types/Home/sites';
import axiosInstance from '../../../../utils/axios';

function Sites() {
  const [listSites, setListSites] = useState<ISites[]>([]);
  const [showAddList, SetShowAddList] = useState<boolean>(false);
  const [setNameSite, setSetNameSite] = useState<string>('');
  const [setUrlSite, setSetUrlSite] = useState<string>('');
  const [setMaintenanceSite, setSetMaintenanceSite] = useState<boolean>(false);
  const [setBanSite, setSetBanSite] = useState<boolean>(false);

  const fetchListSites = async () => {
    try {
      const res = await axiosInstance.get('/status/site');
      setListSites(res.data);
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/status/site/${event.target.id}`, {
        [event.target.name]: event.target.checked,
      });
      setListSites((prev) => prev.map((newsItem) => {
        if (newsItem.id === Number(event.target.id)) {
          return { ...newsItem, [event.target.name]: !event.target.checked };
        }
        return newsItem;
      }));
      // on recupere les données et on les mets dans le state pour les afficher
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/status/site/${id}`);
      toast.success(result.data.message);
      setListSites((prev) => prev.filter((site) => site.id !== id));
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };
  const handleAdd = async () => {
    SetShowAddList(false);
    try {
      const result = await axiosInstance.post('/status/site', {
        name: setNameSite,
        url: setUrlSite,
        maintenance: setMaintenanceSite,
        ban: setBanSite,
      });
      setListSites((prev) => [...prev, result.data.data]);

      toast.success(result.data.message);
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchListSites();
  }, []);

  return (
    <div>
      <h1>Options</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => SetShowAddList(true)}
      >
        Add Option
      </button>

      <div className="list-group">
        {listSites.map((site) => (
          <div
            className="list-group-item list-group-item-action"
            key={site.id}
          >
            <div className="d-flex w-100 justify-content-between align-items-baseline  ">
              <h5 className="mb-1">{site.name}</h5>
              <input
                type="text"
                className="form-control w-25 "
                placeholder={site.url || 'Value'}
                name="value"
                aria-describedby="button-addon2"
              />

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultChecked={site.maintenance}
                  id={site.id.toString()}
                  onChange={handleSwitch}
                  name="maintenance"
                />
                <label className="form-check-label" htmlFor={site.id.toString()}>
                  Maintenance
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={site.id.toString()}
                  defaultChecked={site.ban}
                  onChange={handleSwitch}
                  name="ban"
                />
                <label className="form-check-label" htmlFor={site.id.toString()}>
                  Ban
                </label>
                {site.ban_at && (
                  <div className="form-text">
                    {`Banni: ${dayjs(site.ban_at).format('DD/MM/YYYY')}`}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(site.id)}
              >
                <i className="bi bi-x" />

              </button>

            </div>
          </div>
        ))}
        {showAddList && (
          <div
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between align-items-baseline  ">
              <input
                type="text"
                className="form-control w-25 "
                placeholder="Name"
                name="value"
                aria-describedby="button-addon2"
                onChange={(e) => setSetNameSite(e.target.value)}
              />
              <input
                type="text"
                className="form-control w-25 "
                placeholder="Url"
                name="value"
                aria-describedby="button-addon2"
                onChange={(e) => setSetUrlSite(e.target.value)}
              />

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultChecked={false}
                  onChange={() => setSetMaintenanceSite(!setMaintenanceSite)}
                  name="maintenance"
                  id="add"
                />
                <label className="form-check-label" htmlFor="add">
                  Maintenance
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="ban"
                  defaultChecked={false}
                  onChange={() => setSetBanSite(!setBanSite)}
                  name="ban"
                />
                <label className="form-check-label" htmlFor="ban">
                  Ban Site

                </label>
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleAdd()}
              >
                Add
              </button>

            </div>
          </div>
        )}
      </div>

    </div>

  );
}

export default Sites;
