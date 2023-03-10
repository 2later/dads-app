/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import auth from '@react-native-firebase/auth';
 import Icon from 'react-native-vector-icons/FontAwesome5';
 // import { PermissionsAndroid } from 'react-native';
 // import { SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
 // import AsyncStorage from '@react-native-async-storage/async-storage';

 import useState from 'react-usestateref';

 import LoginScreen from './screens/LoginScreen';
 import CreateAccountScreen from './screens/CreateAccountScreen';
 import HomeScreen from './screens/HomeScreen';
 import ChatScreen from './screens/ChatScreen';
 import ProfileScreen from './screens/ProfileScreen';
 import ContactsScreen from './screens/ContactsScreen';
 import ForumHomeScreen from './screens/ForumHomeScreen';
 import ForumChildrenScreen from './screens/ForumChildrenScreen'

 const Stack = createNativeStackNavigator();
 const ChatStack = createNativeStackNavigator();
 const ForumStack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();



export const UserContext = React.createContext();

 const ChatScreens = () => (
   <ChatStack.Navigator>
     <ChatStack.Screen component={ContactsScreen} name="Contacts" />
     <ChatStack.Screen
       component={ChatScreen}
       name="Chat"
       options={({ route }) => ({ title: route.params.name })}
     />
   </ChatStack.Navigator>
 );

 const ForumScreens = () => (
   <ForumStack.Navigator>
     <ForumStack.Screen component={ForumHomeScreen} name="Forum Home" options={{ headerShown: false }} />
     <ForumStack.Screen component={ForumChildrenScreen} name="Forum Children" options={({ route }) => ({ title: route.params.selectedTopic }) } />
   {/* <ForumStack.Screen component={() => () } name="Post" /> */}
   </ForumStack.Navigator>
 )


 const Tabs = () => (
   <Tab.Navigator
     screenOptions={{
       unmountOnBlur: true,
       headerShown: false,
       tabBarActiveTintColor: '#efeded',
       tabBarInactiveTintColor: '#020202',
       tabBarShowLabel: false,
       tabBarIconSize: 10,
       tabBarStyle: {
         backgroundColor: '#80af92',
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20,
         margin: 6,
         borderRadius: 1,
         height: 70,
       },
     }}>
     <Tab.Screen
       name="Home"
       component={HomeScreen}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="home" color={color} size={size} />
         ),
       }}
     />
     <Tab.Screen
       name="Chats"
       component={ChatScreens}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="comment" color={color} size={size} />
         ),
       }}
     />
     <Tab.Screen
       name="Legal"
       component={ForumScreens}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="balance-scale" color={color} size={size} />
         ),
       }}
     />
     <Tab.Screen
       name="Profile"
       component={ProfileScreen}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="user-circle" color={color} size={size} />
         ),
       }}
     />
   </Tab.Navigator>
 );

export default function App() {
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();

   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }

   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);

   if (initializing) return null;

   if (!user) return (
     <>
       <NavigationContainer>
         <Stack.Navigator
           screenOptions={{ unmountOnBlur: true, headerShown: false }}>
           <Stack.Screen component={LoginScreen} name="Login" />
           <Stack.Screen component={CreateAccountScreen} name="Create Account" />
         </Stack.Navigator>
       </NavigationContainer>
     </>
   )

   return (
     <UserContext.Provider value={user}>
       <NavigationContainer>
         <Stack.Navigator
           screenOptions={{ unmountOnBlur: true, headerShown: false }}>
           <Stack.Screen component={Tabs} name="HomeTabs" />
         </Stack.Navigator>
       </NavigationContainer>
     </UserContext.Provider>
   );
}
