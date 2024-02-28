import { useState } from 'react';
import useImageUpload from '../../hook/utils/useImageUpload'; // Assurez-vous que le chemin est correct
import { IAvatarWithoutObject } from '../../@types/Home/user';

type FileUploaderProps = {
  submit: (file: IAvatarWithoutObject) => void;
  img: string | undefined;
};

export default function FileUploader({ submit, img = '' }: FileUploaderProps) {
  const { handleUpload } = useImageUpload();
  const [imageFile, setImageFile] = useState<IAvatarWithoutObject | null>(null);
  const [isHover, setIsHover] = useState(false);
  const url = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://www.mimouss.fr';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const urlImage = await handleUpload(e); // Gère l'upload de l'image
    if (urlImage) {
      submit(urlImage);
    }
    return null;
  };
  const styleRound: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    width: '200px',
    height: '50px',
    backgroundColor: isHover ? '#00B4FF' : 'rgb(255, 255, 255, 0.2)',
    opacity: 0.8,
    overflow: 'hidden',
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.8s ease',
  };
  const styleInput: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    transform: 'scale(2)',
  };

  return (
    <div className="position-relative align-content-center d-flex justify-content-center mb-3">
      {img && (
        <>
          <img src={`${url}/images/${img}`} alt={img} width={200} className="img-fluid img-thumbnail border-1 border" />
          <div
            style={styleRound}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*"
              style={styleInput}
            />
            Change
          </div>
        </>
      )}
      {!img && (
        <div className="input-group mb-3">
          <input
            type="file"
            name="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
          {imageFile && (
            <img src={`${url}/images/${imageFile.path}`} alt="Uploaded" />
          )}
        </div>
      )}
    </div>
  );
}
