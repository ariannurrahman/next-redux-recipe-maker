import { FormInput } from '@/ui/recipe/form/FormInput';
import { FormToggle } from '@/ui/recipe/form/toggle';
import { RecipeList } from '@/ui/recipe/recipe-list';

export default function Home() {
  return (
    <main className='flex min-h-screen  flex-col items-center justify-start p-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <FormInput id='recipeName' name='recipeName' required={false} type='text' placeholder='Recipe name' />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 w-screen p-20'>
        <RecipeList />
        <FormToggle />
      </div>
    </main>
  );
}
