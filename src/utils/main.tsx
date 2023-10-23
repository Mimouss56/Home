import axiosInstance from './axios';

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
