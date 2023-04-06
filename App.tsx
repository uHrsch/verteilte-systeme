import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon, IconComponentProvider, Pressable, ThemeProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import ContextChain from "./components/ContextChain";
import { useEditIconContext } from "./contexts/EditIconContext";
import { useStorageContext } from "./contexts/StorageContext";
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";
import { ChatParams } from "./views/RootStackParams";
import Settings from "./views/Settings";
import React from "react";
import{ Menu, MenuTrigger} from "react-native-popup-menu";
import { useCreateGroupContext } from "./contexts/CreateGroupContext"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <ContextChain>
            <Navigation/>
        </ContextChain>
    </IconComponentProvider>
  );
}

function Navigation() {

    const { open } = useEditIconContext()
    const { group } = useCreateGroupContext() 

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
            <StatusBar backgroundColor={"#232a2f"}/>
            <Stack.Navigator initialRouteName="Chats">
                <Stack.Screen name="Chats" component={Chatlist} options={(e) => ({
                    headerRight: () => (
                        <Pressable onPress={() => {e.navigation.navigate("Settings")}}>
                            <Icon name="cog" size={24} color="white"/>
                        </Pressable>
                    )
                })}
                />
                <Stack.Screen name="Connect" component={Connect} />
                <Stack.Screen name="Camera" component={Camera} />
                <Stack.Screen 
                    name="Chat" 
                    options={() => ({ 
                        title: `Chat`,
                        headerRight: () => (
                            <Menu>
                                <MenuTrigger>
                                    <Icon name="dots-vertical" size={24} color="white"/>
                                </MenuTrigger>
                                <Pressable onPress={ open }>
                                    <Icon name="pencil" size={24} color={"white"}/>
                                </Pressable>
                                <Pressable>
                                    <Icon name="account-group" size={24} color={"white"}/>
                                </Pressable>
                            </Menu>
                        )
                    })}
                >
                    {props =>(
                        <Chat 
                            id={(props.route.params as ChatParams).id} 
                            {...props}/>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}