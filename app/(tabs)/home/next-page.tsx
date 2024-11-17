import { StyleSheet, Animated, View } from "react-native";
import { router } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTaxContext } from "@/utils/TaxContext";

export default function NextPage() {
  const { takeHomePay } = useTaxContext();

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <ThemedView style={styles.content}>
          <View
            style={{
              height: 200,
              backgroundColor: "#66b49d",
              flex: 1,
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <Text size="2xl" style={{ color: "white", textAlign: "center" }}>
              Your take home pay is
            </Text>
            <Text size="4xl" style={{ color: "#de6a57", textAlign: "center" }}>
              {takeHomePay}
            </Text>
          </View>
          <Button
            onPress={() => {
              router.push("/");
            }}
            style={{ backgroundColor: "#de6a57" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
              Start Again
            </Text>
          </Button>
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    backgroundColor: "#66b49d",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  dropdown: {
    margin: 16,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
});
