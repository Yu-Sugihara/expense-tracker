import { RouterProvider } from 'react-router';
import { router } from './routes'; // ← あなたが作成した routes.tsx を使う！

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
