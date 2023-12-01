import { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode,
  title: string,
  className?: string
}

export default function Frame(props: FrameProps) {
  return (
    <div className={props.className}>
      <h2>
        {props.title}
      </h2>
      <div>{props.children}</div>
    </div>
  );
}