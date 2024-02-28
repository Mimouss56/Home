import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { INews } from '../../../../@types/Home/news';
import axiosInstance from '../../../../utils/axios';
import { ErrorSanctionProps } from '../../../../@types/error';
import ModalAddNews from '../../../../components/Modal/News/formNews';

function NewsList() {
  const [newsList, setNewsList] = useState<INews[]>([]);

  const fetchListNews = async () => {
    try {
      const response = await axiosInstance.get('/api/home/news');
      // on trie les news par date de création et on recupére seulement les news avec un draft false
      response.data.sort(
        (a: INews, b: INews) => (a.created_at < b.created_at ? -1 : 1),
      );
      setNewsList(response.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleSwitchNews = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/api/home/news/${event.target.id}`, {
        draft: event.target.checked,
      });
      setNewsList((prev) => prev.map((newsItem) => {
        if (newsItem.id === Number(event.target.id)) {
          return { ...newsItem, draft: !event.target.checked };
        }
        return newsItem;
      }));
      fetchListNews();
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/api/home/news/${id}`);
      setNewsList(newsList.filter((news) => news.id !== id));
      toast.success(result.data.message);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchListNews();
  }, []);

  return (
    <>
      {/* Bootstrap Modal */}
      <ModalAddNews onAddElement={fetchListNews} />
      <article>
        <div className="d-flex justify-content-between">
          <h1>Liste des News</h1>

          <button
            type="button"
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addModalNews"
          >
            Add News
          </button>
        </div>

        {/* Table to display news */}
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th scope="col">Brouillon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news.id}>
                  <td>{news.id}</td>
                  <td>{news.title}</td>
                  <td>{news.author.username}</td>
                  <td>{new Date(news.created_at).toLocaleDateString()}</td>
                  <td>{news.updated_at ? new Date(news.updated_at).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        defaultChecked={news.draft}
                        id={news.id.toString()}
                        onChange={handleSwitchNews}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#addModalNews"
                      data-bs-id={news.id}
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-1"
                      onClick={() => handleDelete(news.id)}
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </article>
    </>
  );
}

export default NewsList;
