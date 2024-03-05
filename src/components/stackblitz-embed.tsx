import { component$ } from '@builder.io/qwik';

interface Props {
  id: string;
}

const StackBlitz = component$<Props>(({ id }) => {
  return <div>StackBlitz</div>;
});

export default StackBlitz;
