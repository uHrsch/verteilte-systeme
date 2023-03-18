import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <NavigationContainer theme={{
            colors: {
                background: "#232a2f",
                border: "white",
                primary: "#3d84c5",
                text: "white",
                card: "#232a2f",
                notification: "#434749",
            },
            dark: true,
        }}>
            <StatusBar/>
            <Stack.Navigator initialRouteName="Chats">
                <Stack.Screen name="Chats" component={Chatlist} />
                <Stack.Screen name="Connect" component={Connect} />
                <Stack.Screen name="Camera" component={Camera} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    </IconComponentProvider>
  );
}
