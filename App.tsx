import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon, IconComponentProvider, Pressable } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';
import EditIconContextProvider, { useEditIconContext } from "./contexts/EditIconContext";
import { getCallback } from "./util/editIcon";
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";
import { ChatParams } from "./views/RootStackParams";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <EditIconContextProvider>
            <Navigation/>
        </EditIconContextProvider>
    </IconComponentProvider>
  );
}

function Navigation() {

    const { open } = useEditIconContext()

    return (
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
                <Stack.Screen 
                    name="Chat" 
                    options={({ route }) => ({ 
                        title: `Chat: ${(route.params as ChatParams).name}`,
                        headerRight: () => (
                            <Pressable onPress={open}>
                                <Icon name="pencil" size={24} color="white"/>
                            </Pressable>
                        )
                    })}
                >
                    {props =>(
                        <Chat 
                            name={(props.route.params as ChatParams).name} 
                            ip={(props.route.params as ChatParams).ip} 
                            id={(props.route.params as ChatParams).id} 
                            {...props}/>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}