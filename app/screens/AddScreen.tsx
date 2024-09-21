import React, { FC, useState } from "react";
import { Text, Image, ImageBackground, ScrollView, StyleSheet, View} from "react-native";
import { FieldArray, Formik } from "formik";
import { Unit } from "@/app/models/Unit";
import { addRecipeValidator } from "@/app/utils/addRecipeValidator";
import { IconButton, TextInput, TouchableRipple } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHeader } from "@/app/components/BackHeader";
import { LinearGradient } from "expo-linear-gradient";

export const AddScreen: FC = () => {
    const [imgUrl, setImgUrl] = useState<string>("default_food.jpeg");

    return (
        <ImageBackground
            source={require("@/assets/images/recipeBackground.jpg") }
            style={ styles.background }
        >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.main}>
                <BackHeader favorite={false} />
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        image: "",
                        ingredients: [{ name: "", quantity: "", unit: Unit.g }],
                    }}
                    validationSchema={addRecipeValidator}
                    onSubmit={(values) => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={styles.scrollContent}>
                                <TouchableRipple onPress={() => console.log("Handle image upload")}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}images/${imgUrl}` }}
                                            style={styles.image}
                                        />
                                        <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.gradient} />
                                    </View>
                                </TouchableRipple>

                                {/* Title input */}
                                <TextInput
                                    label="Title"
                                    value={values.title}
                                    onChangeText={handleChange("title")}
                                    onBlur={handleBlur("title")}
                                    error={Boolean(errors.title && touched.title)}
                                    mode="outlined"
                                    style={styles.input}
                                />

                                {/* Description input */}
                                <TextInput
                                    label="Description"
                                    value={values.description}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                    error={Boolean(touched.description && errors.description)}
                                    mode="outlined"
                                    multiline
                                    numberOfLines={3}
                                    style={styles.input}
                                />

                                {/* Ingredients Section */}
                                <FieldArray
                                    name="ingredients"
                                    render={(arrayHelpers) => (
                                        <View>
                                            {values.ingredients.map((ingredient, index) => (
                                                <View key={index} style={styles.form}>
                                                    <IconButton
                                                        icon="minus-circle-outline"
                                                        onPress={() => arrayHelpers.remove(index)}
                                                        disabled={ index === 0 }
                                                    />
                                                    <TextInput
                                                        label="Name"
                                                        value={ingredient.name}
                                                        onChangeText={handleChange(`ingredients[${index}].name`)}
                                                        onBlur={handleBlur(`ingredients[${index}].name`)}
                                                        error={
                                                            touched.ingredients?.[index]?.name &&
                                                            (errors.ingredients?.[index] as any).name
                                                        }
                                                        mode="outlined"
                                                        style={styles.formInput}
                                                        keyboardType={"default"}
                                                    />
                                                    <TextInput
                                                        label="Quantity"
                                                        value={ingredient.quantity.toString()}
                                                        onChangeText={handleChange(`ingredients.${index}.quantity`)}
                                                        onBlur={handleBlur(`ingredients.${index}.quantity`)}
                                                        error={
                                                            touched.ingredients?.[index]?.quantity &&
                                                            (errors.ingredients?.[index] as any).quantity
                                                        }
                                                        mode="outlined"
                                                        style={styles.quantityInput}
                                                        keyboardType="numeric"
                                                    />
                                                    {/* Unit dropdown */}
                                                    <View style={ styles.unitInput } >
                                                        <Dropdown
                                                            label="Unit"
                                                            value={values.ingredients[index].unit}
                                                            options={[
                                                                { label: "g", value: Unit.g },
                                                                { label: "cl", value: Unit.cl },
                                                                { label: "p", value: Unit.p },
                                                            ]}
                                                            onSelect={(unit) =>
                                                                arrayHelpers.replace(index, {
                                                                    ...values.ingredients[index],
                                                                    unit,
                                                                })
                                                            }
                                                            mode="outlined"
                                                        />
                                                    </View>
                                                </View>
                                            ))}
                                            <IconButton
                                                icon="plus-circle-outline"
                                                size={30}
                                                onPress={() =>
                                                    arrayHelpers.push({ name: "", quantity: "", unit: Unit.g })
                                                }
                                                style={styles.addIcon}
                                            />
                                        </View>
                                    )}
                                />
                            </ScrollView>
                            <View style={styles.footer}>
                                <TouchableRipple
                                    onPress={ () => handleSubmit }
                                    style={styles.addButton}
                                    rippleColor="rgba(255, 255, 255, 0.3)"
                                >
                                    <LinearGradient
                                        colors={['#FF8C00', '#FF4500']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.buttonGradient}
                                    >
                                        <Text style={styles.buttonText}>Add Recipe</Text>
                                    </LinearGradient>
                                </TouchableRipple>
                            </View>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    background: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.7,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
    form: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -15
    },
    imageContainer: {
        marginBottom: 24,
        marginTop: 56,
        elevation: 8,
        borderRadius: 30,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        borderRadius: 30,
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
    formInput: {
        flex: 3,
        marginRight: 5,
    },
    quantityInput: {
        flex: 1,
        marginRight: 5,
    },
    unitInput: {
        flex: 0.7,
    },
    addIcon: {
        alignSelf: "center",
        marginTop: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#CCC",
        backgroundColor: "#FFF",
        elevation: 5,
    },
    addButton: {
        borderRadius: 30,
        overflow: "hidden",
    },
    buttonGradient: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: "center",
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
        textTransform: "uppercase",
    },
});
