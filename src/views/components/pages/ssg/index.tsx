import { NextPage } from 'next';
import Link from 'next/link';

export type Props = {
  formattedDate: string;
};

const SSG: NextPage<Props> = ({ formattedDate }) => {
  return (
    <>
      <h1>Static page</h1>
      <p>This page is static. It was built on {formattedDate}.</p>
      <p>
        <Link href='/ssr'>View a server-side rendered page.</Link>
      </p>
    </>
  );
};

export default SSG;
