import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Grid, LoadingOverlay, Modal, Space, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet-async';
import { Swimlane } from '../../../common/dtos/swimlane.dto';
import { reorderSwimlaneCards } from '../../../common/utils/reorder.util';
import { useGetSwimlanesQuery, useUpdateSwimlanesMutation } from '../../../store/services/api.service';
import { AddForm } from './components/AddForm';

const KanbanBoard = () => {
  const [swimlaneData, setSwimlaneData] = useState<Swimlane[]>([]);
  const { data, error, isLoading } = useGetSwimlanesQuery();
  const [updateSwimlanes, { isLoading: updateSwimlanesIsLoading }] = useUpdateSwimlanesMutation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setSwimlaneData(data);
    }
  }, [data]);

  useEffect(() => {
    if (JSON.stringify(swimlaneData) !== JSON.stringify(data)) {
      const payload = swimlaneData.map(s => ({ id: s.id, cards: s.cards.map(c => c.id) }));
      if (payload.length > 0) {
        void updateSwimlanes(payload);
      }
    }
  }, [swimlaneData]);

  const onDragEnd = (result: DropResult) => {
    // Not dragged to a drop zone
    if (!result.destination) {
      return;
    }

    const { draggableId, source, destination } = result;
    // Did not move anywhere -- escape here
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const data = reorderSwimlaneCards({ swimlanes: swimlaneData, cardId: draggableId, source, destination });
    setSwimlaneData(data);

    return;
  };

  return (
    <>
      <Helmet title="Boat Status" />
      <Modal opened={modalVisible} onClose={() => setModalVisible(false)} title="Add Boat to Board">
        <AddForm setModalVisible={setModalVisible} />
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title order={1}>Boat Status</Title>
        <Button color="green" onClick={() => setModalVisible(true)} rightIcon={<PlusOutlined color="#F0F" />}>
          Add Boat
        </Button>
      </div>
      <Space h={8} />
      <Grid columns={12} gutter={'sm'}>
        {swimlaneData.map(swimlane => {
          return (
            <Grid.Col key={swimlane.id} span={3}>
              <span>
                <Text>{swimlane.name}</Text>
              </span>
            </Grid.Col>
          );
        })}
      </Grid>
      <Grid columns={12} gutter={'sm'}>
        <LoadingOverlay visible={isLoading} />
        <DragDropContext onDragEnd={onDragEnd}>
          {swimlaneData.map(swimlane => {
            return (
              <Grid.Col key={swimlane.id} span={3}>
                {/* <span>
                    <Text>{swimlane.name}</Text>
                  </span> */}
                <Droppable droppableId={swimlane.id} key={swimlane.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'cornflowerblue' : 'lightgrey',
                          padding: '4px',
                          minHeight: '500px',
                        }}
                      >
                        {swimlane.cards.map((card, index) => {
                          return (
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <>
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {card.boat.name}
                                    </Card>
                                    <Space h={8} />
                                  </>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </Grid.Col>
            );
          })}
        </DragDropContext>
      </Grid>
    </>
  );
};

export default KanbanBoard;
