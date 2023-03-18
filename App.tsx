import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { StatusBar } from 'react-native';
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <StatusBar/>
        <Chatlist/>
    </IconComponentProvider>
  );
}
