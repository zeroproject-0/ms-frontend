import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { LoginPage } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ChatPage } from './pages/Chat';
import { ProtectedRoute } from './ProtectedRoute';
import { SocketProvider } from './context/SocketContext';
import { ChatProvider } from './context/ChatContext';
import { RegisterPage } from './pages/Register';

function App() {
	return (
		<SocketProvider>
			<AuthProvider>
				<ChatProvider>
					<BrowserRouter>
						<Routes>
							<Route index element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />

							<Route element={<ProtectedRoute />}>
								<Route path="/chat" element={<ChatPage />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</ChatProvider>
			</AuthProvider>
		</SocketProvider>
	);
}

export default App;
