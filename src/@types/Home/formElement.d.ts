export interface DateInputProps {
  placeholder: string;
  name: string;
  value: string;
  max?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IInputText {
  type?: 'text' | 'email' | 'tel' | 'date' | 'password',
  text?: string,
  title: string,
  name: string,
  icon?: string | null,
  placeholder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ITextArea {
  text: string,
  title: string,
  leng: number,
  name: string,
  icon: string | null,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
