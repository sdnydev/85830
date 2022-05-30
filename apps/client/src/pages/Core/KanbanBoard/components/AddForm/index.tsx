import { CreateCardDto } from '@85830/common-kit';
import { ColumnWidthOutlined, FlagOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Select, Space } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import {
  useCreateCardMutation,
  useGetBoatsQuery,
  useGetSwimlanesQuery,
} from '../../../../../store/services/api.service';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddForm = ({ setModalVisible }: Props) => {
  const { data: boatData, error: boatError, isLoading: boatIsLoading } = useGetBoatsQuery();
  const { data: swimlaneData, error: swimlaneError, isLoading: swimlaneIsLoading } = useGetSwimlanesQuery();

  const [createCard, { isLoading }] = useCreateCardMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: classValidatorResolver(CreateCardDto),
    defaultValues: {
      boatId: '',
      swimlaneId: swimlaneData?.[0].id,
    },
  });

  const onSubmit = async (values: Record<string, any>) => {
    await createCard({ boatId: values.boatId, swimlaneId: values.swimlaneId });
    setModalVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="boatId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="sm"
              placeholder="Choose a Boat"
              label="Boat"
              error={errors.boatId && errors.boatId.message}
              icon={<FlagOutlined style={{ fontSize: '16px' }} />}
              data={boatData?.map(boat => ({ value: boat.id, label: boat.name })) ?? []}
            />
          )}
        />
        <Space h="xs" />
        <Controller
          name="swimlaneId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="sm"
              placeholder="Choose a Swimlane"
              label="Swimlane"
              error={errors.swimlaneId && errors.swimlaneId.message}
              icon={<ColumnWidthOutlined style={{ fontSize: '16px' }} />}
              data={swimlaneData?.map(swimlane => ({ value: swimlane.id, label: swimlane.name })) ?? []}
            />
          )}
        />
        <Space h="xs" />
        <Button fullWidth loading={isLoading} size="xs" type="submit">
          Add Boat to Board
        </Button>
      </form>
    </>
  );
};
