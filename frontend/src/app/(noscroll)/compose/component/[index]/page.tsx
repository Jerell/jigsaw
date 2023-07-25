import ComponentPanel from './Info';

export default function Page({ params }: { params: { index: string } }) {
  return <ComponentPanel index={Number(params.index)} />;
}
