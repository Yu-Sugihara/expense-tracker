// src/routes.ts
import { createBrowserRouter } from 'react-router';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ReceiptListPage from './pages/ReceiptListPage';
import ReceiptDetailPage from './pages/ReceiptDetailPage'; // 追加

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectListPage />,
  },
  {
    path: '/projects/:projectId',
    element: <ProjectDetailPage />,
  },
  {
    path: '/projects/:projectId/receipts',
    element: <ReceiptListPage />,
  },
  {
    path: '/projects/:projectId/receipts/:receiptId', // ✅ 新規ルート
    element: <ReceiptDetailPage />,
  },
]);
