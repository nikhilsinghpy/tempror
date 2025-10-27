import { router } from "./routes/index.routes";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./utils/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="belleza-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
