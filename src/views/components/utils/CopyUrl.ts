type Props = {
  url: string;
  text: string;
};

export const copyUrl = ({ url, text }: Props) => {
  navigator.clipboard.writeText(url).then(() => {
    alert(text);
  });
};
