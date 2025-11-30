import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  // TODO: Re-enable data fetching with Clerk-Supabase integration
  // const cookieStore = await cookies()
  // const supabase = createClient(cookieStore)
  // const { data: todos } = await supabase.from('todos').select()
  const todos: any[] = [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(todos, null, 2)}
      </pre>
      {(!todos || todos.length === 0) && <p>No todos found or table does not exist.</p>}
    </div>
  )
}
