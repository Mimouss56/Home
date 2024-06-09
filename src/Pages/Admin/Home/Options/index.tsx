import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IOption } from '../../../../@types/Home/option';
import ModalAdd from '../../../../components/Modal/Admin/addOption';
import axiosInstance from '../../../../utils/axios';
import { ErrorAxios, ErrorSanctionProps } from '../../../../@types/error';

function Options() {
  const [listOptions, setListOptions] = useState<IOption[]>([]);

  const fetchListOptions = async () => {
    try {
      const res = await axiosInstance.get('/api/home/option');
      setListOptions(res.data);
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };
  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/api/home/option/${event.target.id}`, {
        active: event.target.checked,
      });
      setListOptions((prev) => prev.map((newsItem) => {
        if (newsItem.id === Number(event.target.id)) {
          return { ...newsItem, draft: !event.target.checked };
        }
        return newsItem;
      }));
      fetchListOptions();
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, value } = e.target as typeof e.target & {
      name: { value: string };
      value: { value: string };
    };
    const inputData = {
      name: name.value,
      value: value.value,
    };
    try {
      const result = await axiosInstance.post('/api/home/option', inputData);

      toast.info(result.data.message);
      fetchListOptions();
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/api/home/option/${id}`);
      toast.success(result.data.message);
      fetchListOptions();
    } catch (err) {
      const { message } = err as ErrorAxios;
      toast.error(message);
    }
  };

  useEffect(
    () => {
      fetchListOptions();
    },
    [],
  );

  return (
    <div>
      <h1>Options</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#ModalAddOption"
      >
        Add Option
      </button>
      <ul className="list-group">
        {listOptions.map((option) => (
          <li
            key={option.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="input-group">
              <span className="input-group-text" id="button-addon1">{option.name}</span>
              {option.active && (
                <input
                  type="text"
                  className="form-control"
                  placeholder={option.value || 'Value'}
                  name="value"
                  aria-describedby="button-addon2"
                  defaultValue={option.value}
                />
              )}
              <div className="form-check form-switch">
                <input
                  className="form-check-input "
                  type="checkbox"
                  role="switch"
                  defaultChecked={option.active}
                  id={option.id.toString()}
                  onChange={handleSwitch}
                />
              </div>

            </div>
            <div className="btn-group input-form" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(option.id)}
              >
                <i className="bi bi-trash3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <ModalAdd />

      </form>

    </div>

  );
}

export default Options;
