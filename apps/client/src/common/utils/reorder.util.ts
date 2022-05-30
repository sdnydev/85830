import { DraggableId, DraggableLocation } from 'react-beautiful-dnd';
import { Card } from '../dtos/card.dto';
import { Swimlane } from '../dtos/swimlane.dto';

const reorder = (list: Card[], startIndex: number, endIndex: number): Card[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface ReorderSwimlaneProps {
  swimlanes: Swimlane[];
  cardId: DraggableId;
  source: DraggableLocation;
  destination: DraggableLocation;
}

export const reorderSwimlaneCards = ({ swimlanes, cardId, source, destination }: ReorderSwimlaneProps) => {
  const swimlaneSourceIndex = swimlanes.findIndex(swimlane => swimlane.id === source.droppableId);

  // Moving to the same list
  if (source.droppableId === destination.droppableId) {
    return swimlanes.map(swimlane => {
      if (swimlane.id === source.droppableId) {
        return {
          ...swimlane,
          cards: reorder(swimlanes[swimlaneSourceIndex].cards, source.index, destination.index),
        };
      }
      return swimlane;
    });
  }

  // Moving to a different list
  const cardToMove = swimlanes[swimlaneSourceIndex].cards.find(card => card.id === cardId);
  if (!cardToMove) throw new Error('Could not find cardToMove');

  return swimlanes.map(swimlane => {
    if (swimlane.id === source.droppableId) {
      // Remove from source
      const cards: Card[] = [...swimlane.cards];
      cards.splice(source.index, 1);

      return {
        ...swimlane,
        cards: cards,
      };
    } else if (swimlane.id === destination.droppableId) {
      // Add to destination
      const cards: Card[] = [...swimlane.cards];
      cards.splice(destination.index, 0, cardToMove);

      return {
        ...swimlane,
        cards: cards,
      };
    }

    return swimlane;
  });
};
