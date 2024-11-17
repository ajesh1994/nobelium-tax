import { StyleSheet, Animated, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import { useForm, Controller, FieldValues } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";

import { CircleIcon, HelpCircleIcon } from "@/components/ui/icon";

import { calculateTax } from "@/utils/taxCalculation";
import { useState } from "react";
import { Link, Stack } from "expo-router";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Button } from "@/components/ui/button";
import { useTaxContext } from "@/utils/TaxContext";

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

  const { setTaxValues } = useTaxContext();

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

    router.replace("./home/next-page");

    setTaxValues({ takeHomePay: calculatedTakeHomePay.toString() });
  };

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <ThemedView style={styles.content}>
          <Text style={[styles.titleContainer]} size="3xl">
            Tax Calculator
          </Text>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text size="xl" style={{ color: "white" }}>
                    Gross Income
                  </Text>

                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={!!errors.grossIncome}
                    isReadOnly={false}
                    isRequired={true}
                    style={{ backgroundColor: "white" }}
                  >
                    <InputField
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Type your income"
                      keyboardType="numeric"
                    />
                  </Input>
                </>
              )}
              name="grossIncome"
            />
            {errors.grossIncome && (
              <Text style={{ color: "#de6a57" }}>This is required.</Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text size="xl" style={{ color: "white" }}>
                    Repayment Plan
                  </Text>
                  <Select
                    onValueChange={onChange}
                    isInvalid={!!errors.repaymentPlan}
                  >
                    <SelectTrigger
                      style={{ backgroundColor: "white" }}
                      variant="outline"
                      size="md"
                    >
                      <SelectInput placeholder="Select Plan" />
                      <SelectIcon className="mr-3" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {plans.map((plan) => (
                          <SelectItem
                            label={plan.label}
                            value={plan.value.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </>
              )}
              name="repaymentPlan"
            />
            {errors.repaymentPlan && (
              <Text style={{ color: "#de6a57" }}>This is required.</Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={"no"}
              render={({ field: { onChange, value } }) => {
                return (
                  <View>
                    <Text size="xl" style={{ color: "white" }}>
                      Post Graduate
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <RadioGroup
                        style={{
                          padding: 8,
                          backgroundColor: "white",
                          width: "100%",
                        }}
                        value={value}
                        onChange={onChange}
                      >
                        <Radio
                          value="no"
                          size="md"
                          isInvalid={false}
                          isDisabled={false}
                        >
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                          <RadioLabel>No</RadioLabel>
                        </Radio>

                        <Radio
                          value="yes"
                          size="md"
                          isInvalid={false}
                          isDisabled={false}
                        >
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                          <RadioLabel>Yes</RadioLabel>
                        </Radio>
                      </RadioGroup>
                    </View>
                  </View>
                );
              }}
              name="postGraduate"
            />
            {errors.postGraduate && (
              <Text style={{ color: "#de6a57" }}>This is required.</Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0,
                max: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={{ color: "white" }} size="xl">
                    Pension Percentage
                  </Text>

                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={!!errors.pensionPercentage}
                    isReadOnly={false}
                    isRequired={true}
                    style={{ backgroundColor: "white" }}
                  >
                    <InputField
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Type your pension percentage"
                      keyboardType="numeric"
                    />
                  </Input>
                </>
              )}
              name="pensionPercentage"
            />
            {errors.pensionPercentage && (
              <Text style={{ color: "#de6a57" }}>This is required.</Text>
            )}
          </View>

          <Button
            style={{ backgroundColor: "#de6a57" }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
              Calculate Pay
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
    color: "white",
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
