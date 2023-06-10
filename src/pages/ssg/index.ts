import SSG from '~/src/views/components/pages/ssg';

export async function getStaticProps() {
  const buildDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'long',
  }).format(buildDate);

  return { props: { formattedDate } };
}

export default SSG;
