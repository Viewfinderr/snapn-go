
import Navbar from '@/Components/navbar';
import FoodSlider from '@/Components/FoodSlider';
import Items from '@/Components/Items'

export default function Home() { 
  return (
    <div>
     <FoodSlider/>
      <Items/>
      <Navbar/>
    </div>
  );
}

