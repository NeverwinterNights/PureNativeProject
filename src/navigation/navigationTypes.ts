import {
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';

export type AuthNavigatorStackParamList = {
  LoginScreen: undefined;
  Login: undefined;
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
  AuthNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>;
  DrawerNavigator: NavigatorScreenParams<DrawerNavigatorParamList>;
};

export const useAppNavigation = () => useNavigation<NavigationType>();

export type NavigationType = NavigationProp<MainNavigatorStackParamList>;
