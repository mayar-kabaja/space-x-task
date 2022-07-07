/* eslint-disable no-shadow */
import {
  closestCenter, DndContext, PointerSensor, useSensor,
} from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';
import {
  arrayMove, SortableContext, verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import React from 'react';
import Columns from './Columns';
import { Column } from '../utils/types';

interface MyProps {
  items : Column[]
  setItems : (items: any) => any
}

function DragAndDrop({ items, setItems } : MyProps) {
  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({ active, over }:any) => {
    if (active.id !== over.id) {
      setItems((items: Column[]) => {
        const oldIndex = items.findIndex((item: Column) => item.id === active.id);
        const newIndex = items.findIndex((item: Column) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div
      style={{
        margin: 'auto',
        width: 1000,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item:any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {
            items.map(
              (item:any) => <Columns {...item} key={item.id} />,
            )
          }
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default observer(DragAndDrop);
