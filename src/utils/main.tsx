import dayjs from 'dayjs';
import axiosInstance from './axios';

dayjs().format();

export function excerpt(text: string, length = 30) {
  if (text.length <= length) {
    return text;
  }
  return `${text.substring(0, length)} ... voir plus`;
}

export async function getOption(option: string) {
  try {
    const optionValue = await axiosInstance.get(`/api/home/option?name=${option}`);

    return optionValue.data;
  } catch (err) {
    return null;
  }
}

export function textFormatDuration(dateObject: { debut: string, fin: string }) {
  const test = dayjs(dateObject.fin).diff(dayjs(dateObject.debut), 'month', true);
  const years = Math.floor(test / 12);
  const months = Math.floor(test % 12);
  const duration = test > 12 ? `${years} ans et ${months} mois` : `${months} mois`;
  return duration;
}

export const initEditorConfig = {
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar: 'undo redo | formatselect | '
    + 'bold italic backcolor | alignleft aligncenter '
    + 'alignright alignjustify | bullist numlist outdent indent | '
    + 'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};
