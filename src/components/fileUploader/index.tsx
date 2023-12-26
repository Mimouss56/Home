import { useState } from 'react';

type FileUploaderProps = {
  submit: (file: File | undefined) => void;
};

function FileUploader({ submit }: FileUploaderProps) {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const files = element.files as FileList;
    const selectedFile = files ? files[0] : undefined;
    setFile(selectedFile);

    // Appeler la fonction submit pour transmettre le fichier à l'extérieur
    submit(selectedFile);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="file"
        name="file"
        id="file"
        className="form-control"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}

export default FileUploader;
