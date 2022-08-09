import {
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import { SignUpScreen } from "../screens/Auth/SignUpScreen";
import { MainScreen } from "../screens/Main/MainScreen";

export type AuthNavigatorStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

export type HomeNavigatorStackParamList = {
  ContactScreen: undefined;
  ContactDetailScreen: undefined;
  CreateContactScreen: undefined;
  SettingsScreen: undefined;
};

export type DrawerNavigatorParamList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorStackParamList>;
};

export type MainNavigatorStackParamList = {
  MainScreen:undefined
  AuthNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>;
  DrawerNavigator: NavigatorScreenParams<DrawerNavigatorParamList>;
};

export const useAppNavigation = () => useNavigation<NavigationType>();

export type NavigationType = NavigationProp<MainNavigatorStackParamList>;
