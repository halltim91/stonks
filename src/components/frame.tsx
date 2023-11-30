import { ReactNode } from 'react';

export default function Frame(props: { children: ReactNode; title: string }) {
  return (
    <div>
      <h3>
        {props.title}
      </h3>
      <div>{props.children}</div>
    </div>
  );
}