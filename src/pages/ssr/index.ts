import SSR from '~/src/views/components/pages/ssr';

export async function getServerSideProps() {
  const renderDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'long',
  }).format(renderDate);
  console.log(`SSR ran on ${formattedDate}. This will be logged in CloudWatch.`);
  return { props: { formattedDate } };
}

export default SSR;
