import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../views/Auth';

const loginStack = createStackNavigator();

export function LoginStackScreen() {
    return (
      <loginStack.Navigator>
        <loginStack.Screen 
        name="Auth" 
        component={Login}
        options={{
          title: 'Login',
          headerStyle: {
            borderBottomColor: PRIMARY_COLOR,
            borderWidth: 0.5
            
        },
        headerTitleStyle: {
          color: PRIMARY_COLOR
        }
      }}
  
         />
      </loginStack.Navigator>
    );
  }