import Button from '@/app/components/Button/Button';

interface CreateGatheringButtonProps {
  onClick: () => void;
}

const CreateGatheringButton = ({ onClick }: CreateGatheringButtonProps) => {
  return (
    <div className='w-[100px] md:w-[115px]'>
      <Button name='모임 만들기' variant='default' onClick={onClick} />
    </div>
  );
};

export default CreateGatheringButton;
