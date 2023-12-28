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
    const optionValue = await axiosInstance.get(`/home/option?name=${option}`);

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
