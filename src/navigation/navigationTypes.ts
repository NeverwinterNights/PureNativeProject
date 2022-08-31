import {
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
import { SignUpScreen } from "../screens/Auth/SignUpScreen";
import { MainScreen } from "../screens/Main/MainScreen";
import { SettingsNavigator } from "./SettingsNavigator";
import { Logout } from "../components/Logout";
import { ContactData } from "../store/contactsReducer";
import { ContactDetailScreen } from "../screens/Home/ContactDetailScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthNavigatorStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  Logout: undefined;
};

export type SettingsNavigatorStackParamList = {
  SettingsScreen: undefined;
};


export type HomeNavigatorStackParamList = {
  ContactScreen: undefined;
  ContactDetailScreen: { item: ContactData };
  CreateContactScreen: { contact: ContactData } | undefined;
};

export type DrawerNavigatorParamList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorStackParamList>;
  SettingsNavigator: NavigatorScreenParams<SettingsNavigatorStackParamList>;
};

export type MainNavigatorStackParamList = {
  MainScreen: undefined
  AuthNavigator: NavigatorScreenParams<AuthNavigatorStackParamList>;
  DrawerNavigator: NavigatorScreenParams<DrawerNavigatorParamList>;
};


export type ContactDetailScreenPropsType = NativeStackScreenProps<HomeNavigatorStackParamList, 'ContactDetailScreen'>
export type CreateContactScreenPropsType = NativeStackScreenProps<HomeNavigatorStackParamList, 'CreateContactScreen'>



export const useAppNavigation = () => useNavigation<NavigationType>();

export type NavigationType = NavigationProp<MainNavigatorStackParamList>;
