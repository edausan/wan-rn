/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/Home';
import TabTwoScreen from '../screens/Assignments';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Assignments from '../screens/Assignments';
import Lineup from '../screens/Lineup';
import NewLineup from '../screens/Lineup/NewLineup';
import { Button } from 'react-native-paper';
import { useContext } from 'react';
import { LineupCtx } from '../App';
import LINEUP from '../constants/Lineup';
import Media from '../screens/Lineup/NewLineup/Media';
import Chords from '../screens/Lineup/NewLineup/Chords';
import Lyrics from '../screens/Lineup/NewLineup/Lyrics';
import { useDispatch } from 'react-redux';
import { setSaving } from '../redux/slice/lineupSlice';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { handleSave, isSaving } = useContext(LineupCtx);
  const dispatch = useDispatch();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name='Root'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NewLineup'
          component={NewLineup}
          options={{
            title: 'New Lineup',
            headerRight: () => {
              return (
                <Button onPress={() => dispatch(setSaving(true))}>Save</Button>
              );
            },
            animation: 'slide_from_right',
          }}
        />
        <Stack.Group>
          <Stack.Screen
            name='Lyrics'
            component={Lyrics}
            options={{
              title: 'Lyrics',
              headerRight: () => {
                return <Button>Save</Button>;
              },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Chords'
            component={Chords}
            options={{
              title: 'Chords',
              headerRight: () => {
                return <Button>Save</Button>;
              },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name='Media'
            component={Media}
            options={{
              title: 'Media',
              headerRight: () => {
                return <Button>Save</Button>;
              },
              animation: 'slide_from_right',
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name='NotFound'
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Lineup'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name='Assignments'
        component={Assignments}
        options={({ navigation }: RootTabScreenProps<'Assignments'>) => ({
          title: 'Assignments',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='assignment' color={color} />
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name='Lineup'
        component={Lineup}
        options={({ navigation }: RootTabScreenProps<'Lineup'>) => ({
          title: 'Lineup',
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
          headerShown: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}
