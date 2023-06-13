import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ChatPage } from './pages/Chat';
import { ProtectedRoute } from './ProtectedRoute';
import { SocketProvider } from './context/SocketContext';

function App() {
	return (
		<SocketProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LoginPage />} />

						<Route element={<ProtectedRoute />}>
							<Route path="/chat" element={<ChatPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</SocketProvider>
	);
}

export default App;
