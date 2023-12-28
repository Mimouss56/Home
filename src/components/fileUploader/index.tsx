import { useState } from 'react';

type FileUploaderProps = {
  submit: (file: File | undefined) => void;
  img: string | undefined;
};

function FileUploader({ submit, img = '' }: FileUploaderProps) {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const files = element.files as FileList;
    const selectedFile = files ? files[0] : undefined;
    setFile(selectedFile);

    // Appeler la fonction submit pour transmettre le fichier à l'extérieur
    submit(selectedFile);
  };
  const styleRound: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    width: '200px',
    height: '50px',
    backgroundColor: '#00B4FF',
    opacity: 0.8,
    overflow: 'hidden',
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'pointer',
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
          <img src={`https://www.mimouss.fr/images/${img}`} alt={img} width={200} className="" />
          <div style={styleRound}>
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
          {img && (
            <img src={img} alt="img" />
          )}
        </div>
      )}

    </div>
  );
}

export default FileUploader;
