import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./utils/contexts/UserContext";
import ModalProvider from "./utils/contexts/ModalContext";
import ToastProvider from "./utils/contexts/ToastContext";
import WidthProvider from "./utils/contexts/WidthContext";
import PageTransitionProvider from "./utils/contexts/PageTransitionContext";
import SidebarProvider from "./utils/contexts/SidebarContext";

ReactDOM.render(
	// <React.StrictMode>
	<UserProvider>
		<ToastProvider>
			<ModalProvider>
				<BrowserRouter>
					<WidthProvider>
						<PageTransitionProvider>
							<SidebarProvider>
								<App />
							</SidebarProvider>
						</PageTransitionProvider>
					</WidthProvider>
				</BrowserRouter>
			</ModalProvider>
		</ToastProvider>
	</UserProvider>,
	// </React.StrictMode>
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
