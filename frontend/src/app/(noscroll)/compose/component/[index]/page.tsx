export default function Page({ params }: { params: { index: string } }) {
  return <div>My Component: {params.index}</div>;
}
