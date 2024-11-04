// import { Link, Stack } from "expo-router";
// import { Text, View } from "react-native";

// export default function Page() {
//   return (
//     <View>
//       <Stack.Screen options={{ headerShown: true, title: "Home" }} />
//       <Text>Index page of Home Tab</Text>
//       <Link href={"/home/next-page"} style={{ marginTop: 16 }}>
//         <Text style={{ fontWeight: "bold" }}>Go To Next Page</Text>
//       </Link>
//     </View>
//   );
// }

import { StyleSheet, View, Button, Animated } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import { useForm, Controller, FieldValues } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";

import { calculateTax } from "@/utils/taxCalculation";
import { useState } from "react";
import { CheckBox, Input, Text } from "@rneui/themed";
import { Link, Stack } from "expo-router";

type TaxData = {
  grossIncome: string;
  pensionPercentage: string;
  postGraduate: string;
  repaymentPlan: number;
};
const plans = [
  { label: "Plan 1", value: 1 },
  { label: "Plan 2", value: 2 },
];
export default function HomeScreen() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [takeHomePay, setTakeHomePay] = useState<number | null>();
  const onSubmit = (data: FieldValues) => {
    const { grossIncome, pensionPercentage, postGraduate, repaymentPlan } =
      data;
    const hasPostgraduateLoan = postGraduate === "yes" ? true : false;
    const calculatedTakeHomePay = calculateTax(
      Number(grossIncome),
      Number(repaymentPlan),
      Number(pensionPercentage),
      hasPostgraduateLoan
    );
    setTakeHomePay(calculatedTakeHomePay);
  };

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <ThemedView style={styles.content}>
          <Text style={[styles.titleContainer]} h1>
            Tax Calculator
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Gross Income"
                  placeholder="Please type your income"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  errorMessage={
                    errors.grossIncome ? "This is required" : undefined
                  }
                />
              )}
              name="grossIncome"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text>Repayment Plan</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={plans}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Plan"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(item) => {
                      onChange(item.value);
                    }}
                  />
                </>
              )}
              name="repaymentPlan"
            />
            {errors.repaymentPlan && (
              <Text style={{ color: "red" }}>This is required.</Text>
            )}
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={"no"}
              render={({ field: { onChange, value } }) => {
                return (
                  <View>
                    <Text>Post Graduate</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <CheckBox
                        center
                        title="No"
                        checked={value === "no"}
                        onPress={(value) => onChange("no")}
                        iconType="material-community"
                        checkedIcon="radiobox-marked"
                        uncheckedIcon="radiobox-blank"
                      />
                      <CheckBox
                        center
                        title="Yes"
                        checked={value === "yes"}
                        onPress={() => onChange("yes")}
                        iconType="material-community"
                        checkedIcon="radiobox-marked"
                        uncheckedIcon="radiobox-blank"
                      />
                    </View>
                  </View>
                );
              }}
              name="postGraduate"
            />
            {errors.postGraduate && (
              <Text style={{ color: "red" }}>This is required.</Text>
            )}
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0,
                max: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Pension Percentage"
                  placeholder="Please type your pension percentage"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  errorMessage={
                    errors.pensionPercentage ? "This is required." : undefined
                  }
                />
              )}
              name="pensionPercentage"
            />
          </View>

          <Link href={"/home/next-page"} style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Go To Next Page</Text>
          </Link>
          {takeHomePay && (
            <View>
              <Text style={{ textAlign: "center" }}>
                Your take home pay is
                <Text style={{ color: "red" }}> {takeHomePay}</Text>
              </Text>
            </View>
          )}
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
