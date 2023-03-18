import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { StatusBar } from 'react-native';
import Chat from "./views/Chat";
import Connect from "./views/Connect";

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <StatusBar/>
        <Chat/>
    </IconComponentProvider>
  );
}
