import Button from '@/components/buttons/Button';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Controls() {
  return (
    <div className='flex flex-row gap-2'>
      <Button leftIcon={FaPlus}>add</Button>
      <Button leftIcon={FaMinus}>remove</Button>
    </div>
  );
}
