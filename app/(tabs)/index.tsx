import {
  Image,
  StyleSheet,
  Platform,
  View,
  TextInput,
  Button,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { RadioButton, Text } from "react-native-paper";
import { calculateTax } from "@/utils/TaxCalculation";
import { useState } from "react";

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
          <Text style={[styles.titleContainer]}>Tax Calculator</Text>
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
                <>
                  <Text variant="labelLarge">Gross Income</Text>

                  <TextInput
                    placeholder="Please type your income"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                </>
              )}
              name="grossIncome"
            />
            {errors.grossIncome && (
              <Text variant="labelSmall">This is required.</Text>
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
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text variant="labelLarge">Repayment Plan</Text>
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
              <Text variant="labelSmall">This is required.</Text>
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
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text variant="labelLarge">Post Graduate</Text>

                  <RadioButton.Group
                    onValueChange={(value) => onChange(value)}
                    value={value}
                  >
                    <RadioButton.Item
                      label="Yes"
                      value="yes"
                      color="red"
                      uncheckedColor="grey"
                      labelVariant="labelMedium"
                    />
                    <RadioButton.Item
                      label="No"
                      value="no"
                      color="red"
                      uncheckedColor="grey"
                      labelVariant="labelMedium"
                    />
                  </RadioButton.Group>
                </View>
              )}
              name="postGraduate"
            />
            {errors.postGraduate && (
              <Text variant="labelSmall">This is required.</Text>
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
                <>
                  <Text variant="labelLarge">Gross Income</Text>

                  <TextInput
                    placeholder="Please type your income"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                </>
              )}
              name="pensionPercentage"
            />
            {errors.pensionPercentage && (
              <Text variant="labelSmall">This is required.</Text>
            )}
          </View>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
