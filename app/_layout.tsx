import { Stack, Tabs } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title : "Dictionary",
            headerShadowVisible : true,
            headerLargeTitle : true
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}
