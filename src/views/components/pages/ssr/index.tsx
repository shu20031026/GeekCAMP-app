import { NextPage } from 'next';
import Link from 'next/link';

export type Props = {
  formattedDate: string;
};

const SSR: NextPage<Props> = ({ formattedDate }) => {
  return (
    <>
      <h1>Server-side rendered page</h1>
      <p>This page is server-side rendered. It was rendered on {formattedDate}.</p>
      <p>
        <Link href='/'>View a static page.</Link>
      </p>
    </>
  );
};

export default SSR;
