import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import NewsForm from './addForm';
import { ICreateNews, INews } from '../../../../@types/Home/news';
import axiosInstance from '../../../../utils/axios';
import { ErrorSanctionProps } from '../../../../@types/error';

interface ValueTargetForm {
  value: string;
  name: string;
}
function NewsList() {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [currentNews, setCurrentNews] = useState(null as ICreateNews | null);

  const fetchListNews = async () => {
    try {
      const response = await axiosInstance.get('/home/news');
      // on trie les news par date de création et on recupére seulement les news avec un draft false
      response.data.sort(
        (a: INews, b: INews) => (a.updated_at < b.updated_at ? 1 : -1),
      );
      setNewsList(response.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleSwitchNews = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/home/news/${event.target.id}`, {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, content, draft } = e.target as typeof e.target & {
      title: ValueTargetForm;
      content: ValueTargetForm;
      draft: { checked: boolean };
    };

    const inputData = {
      title: title.value,
      content: content.value,
      draft: draft.checked,
      // tags: e.currentTarget.title.value ? currentNews.tags.map((tag) => tag.id) : [],
    };
    if (currentNews) {
      try {
        const newNews = { ...currentNews, ...inputData } as INews;
        const result = await axiosInstance.put(`/home/news/${currentNews.id}`, inputData);
        const index = newsList.findIndex((news) => news.id === currentNews.id);
        newsList[index] = newNews;
        setNewsList(newsList);
        toast.info(result.data.message);
      } catch (error) {
        const { response } = error as ErrorSanctionProps;
        toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      }
    } else {
      try {
        const result = await axiosInstance.post('/home/news', inputData);
        setNewsList((prev) => [...prev, result.data.data]);
        toast.success(result.data.message);
      } catch (error) {
        const { response } = error as ErrorSanctionProps;
        toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      }
    }
    setCurrentNews(null);
    fetchListNews();
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/home/news/${id}`);
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
    <article>
      <div className="d-flex justify-content-between">
        <h1>Liste des News</h1>

        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => setCurrentNews(null)}
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
                    onClick={() => setCurrentNews(news)}
                    data-bs-toggle="modal"
                    data-bs-target="#addModalNews"
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

      {/* Bootstrap Modal */}
      <div className="modal" tabIndex={-1} id="addModalNews">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentNews ? 'Edit News' : 'Add News'}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <form onSubmit={handleSubmit} className="m-5">

              <NewsForm news={currentNews} />
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsList;
