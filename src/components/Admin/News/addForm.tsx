import React, { useState, useEffect } from 'react';
import { ICreateNews, ITag } from '../../../@types/news';

// Mocked
import { mockTags } from './mocked';

interface NewsFormProps {
  news: ICreateNews | null;
}

function NewsForm({ news = null }: NewsFormProps) {
  const [currentNews, setCurrentNews] = useState<ICreateNews>({ title: '', content: '', tags: [] });
  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    if (news) {
      setCurrentNews(news);
    }

    // Simulated API call to fetch tags list
    setAvailableTags(mockTags);
  }, [news]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = Number(e.target.value);
    const selectedTag = availableTags.find((tag) => tag.id === tagId);
    if (selectedTag) {
      setShowSelect(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={currentNews.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          value={currentNews.content}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <div className="mb-3">
        <div className="d-flex flex-wrap align-items-center">
          {currentNews.tags?.map((tag) => (
            <span
              key={tag.id}
              className="badge me-2 mb-2"
              style={{ backgroundColor: tag.color, color: 'white' }}
            >
              {tag.label}
            </span>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => setShowSelect(!showSelect)}
          >
            +
          </button>
          {showSelect && (
            <select
              className="form-select d-inline-block w-auto ms-2 mb-2"
              id="tags"
              name="tags"
              onChange={handleTagSelect}
            >
              <option value="">Select a tag</option>
              {availableTags.filter(
                (tag) => !currentNews.tags?.some((t) => t.id === tag.id),
              ).map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        data-bs-dismiss="modal"
      >
        Save
      </button>
    </>
  );
}

export default NewsForm;
