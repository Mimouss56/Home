import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import NewsForm from './addForm';
import { ICreateNews, INews } from '../../../@types/news';
import axiosInstance from '../../../utils/axios';

function NewsList() {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [currentNews, setCurrentNews] = useState(null as ICreateNews | null);

  const fetchListNews = async () => {
    const response = await axiosInstance.get('/news');
    console.log(response.data);
    setNewsList(response.data);
  };

  const handleEdit = (news = null) => {
    setCurrentNews(news);
  };

  const handleDelete = (id: number) => {
    const result = axiosInstance.delete(`/news/${id}`);
    console.log(result);
    

    toast.success(result.message);
    fetchListNews();
    console.log('Delete news with id:', id);
    // API call to delete the news and then update the list
  };

  useEffect(() => {
    fetchListNews();
  }, []);

  return (
    <div className="container mt-5">
      <h2>News List</h2>

      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => { setCurrentNews(null); }}
        data-bs-toggle="modal"
        data-bs-target="#addModalNews"
      >
        Add News

      </button>

      {/* Table to display news */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Updated At</th>
            {/* <th>Draft</th> */}
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
              <td>{new Date(news.updated_at).toLocaleDateString()}</td>
              {/* <td>{news.draft ? 'Yes' : 'No'}</td> */}
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(news)}
                  data-bs-toggle="modal"
                  data-bs-target="#addModalNews"

                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(news.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      <div className="modal" tabIndex={-1} id="addModalNews">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentNews ? 'Edit News' : 'Add News'}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <NewsForm news={currentNews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;
