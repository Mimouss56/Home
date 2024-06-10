import dayjs from 'dayjs';
import { HexColorString } from 'discord.js';
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
  toolbar: 'undo redo | formatselect | '
    + 'bold italic backcolor | alignleft aligncenter '
    + 'alignright alignjustify | bullist numlist outdent indent | '
    + 'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

export function repeatingLinearGradient(color: HexColorString, float: number) {
  return `repeating-linear-gradient(${color}0 0 ${float - 3}, ${color} ${float})`;
}
