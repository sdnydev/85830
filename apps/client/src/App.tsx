import { Route, Routes } from 'react-router-dom';
import AuthGuard from './common/components/AuthGuard';
import CoreContainer from './pages/Core/CoreContainer';
import KanbanBoard from './pages/Core/KanbanBoard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard redirectTo="login">
            <CoreContainer />
          </AuthGuard>
        }
      >
        <Route path="/" element={<KanbanBoard />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
