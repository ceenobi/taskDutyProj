import { Toaster } from "sonner";
import Approutes from "./routes/Approutes";
import AuthProvider from "./store/AuthProvider";

function App() {
  return (
    <>
      <Toaster richColors />
      <AuthProvider>
        <Approutes />
      </AuthProvider>
    </>
  );
}

export default App;
