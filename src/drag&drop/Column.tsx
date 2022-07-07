import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { observer } from 'mobx-react-lite';

const Column = ({
  id,
  title,
}:any) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: '2px solid black',
    margin: 5,
    padding: 5,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'pointer',
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {title}
    </div>
  );
};

export default observer(Column);
