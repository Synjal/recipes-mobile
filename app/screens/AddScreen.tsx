import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import { FieldArray, Formik } from 'formik'
import { LinearGradient } from 'expo-linear-gradient'
import { Dropdown } from 'react-native-paper-dropdown'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { Header } from '@/app/components/Header'
import { Unit } from '@/app/models/Unit'
import { addRecipeValidator } from '@/app/utils/addRecipeValidator'
import { RecipeContext } from '@/app/context/RecipeContext'
import { SnackbarContext } from '@/app/context/SnackbarContext'
import { colors } from '@/app/constants/colors'

export const AddScreen: FC = () => {
    const { addRecipe } = useContext(RecipeContext)
    const { showSnackbar } = useContext(SnackbarContext)

    // Image
    const [imgUrl, setImgUrl] = useState<string>()

    // Refs
    const titleRef = useRef<any>(null)
    const descriptionRef = useRef<any>(null)
    const nameRefs = useRef<any[]>([])
    const quantityRefs = useRef<any[]>([])

    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    return (
        <ImageBackground source={require('@/assets/images/recipeBackground.jpg')} style={styles.background}>
            <View style={styles.overlay} />
            <SafeAreaView style={styles.main}>
                <Header />
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        image: '',
                        ingredients: [{ name: '', quantity: '', unit: Unit.g }],
                    }}
                    validationSchema={addRecipeValidator}
                    onSubmit={async (inputs, { resetForm }) => {
                        const values = {
                            ...inputs,
                            ingredients: inputs.ingredients.map(ingredient => ({
                                ...ingredient,
                                quantity: parseFloat(ingredient.quantity),
                            })),
                        }

                        await addRecipe(values)
                        showSnackbar('Nice, a new recipe has been added !')
                        resetForm()
                        titleRef.current.focus()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                        const handleImageChange = async () => {
                            const image = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 1,
                            })
                            if (!image.canceled) {
                                await setFieldValue('image', image.assets[0].uri)
                                setImgUrl(image.assets[0].uri)
                            }
                        }

                        return (
                            <View style={styles.container}>
                                <ScrollView
                                    keyboardShouldPersistTaps={'handled'}
                                    contentContainerStyle={styles.scrollContent}
                                >
                                    {/* Clickable image */}
                                    <TouchableRipple onPress={handleImageChange}>
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={
                                                    imgUrl
                                                        ? { uri: imgUrl }
                                                        : require('@/assets/images/uploadImage.png')
                                                }
                                                style={styles.image}
                                            />
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.5)']}
                                                style={styles.gradient}
                                            />
                                        </View>
                                    </TouchableRipple>

                                    {/* Title input */}
                                    <TextInput
                                        ref={titleRef}
                                        label="Title"
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={() => {
                                            handleBlur('title')
                                            descriptionRef.current.focus()
                                        }}
                                        error={Boolean(errors.title && touched.title)}
                                        mode="outlined"
                                        style={styles.input}
                                    />

                                    {/* Description input */}
                                    <TextInput
                                        ref={descriptionRef}
                                        label="Description"
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={() => {
                                            handleBlur('description')
                                            nameRefs.current[0].focus()
                                        }}
                                        error={Boolean(touched.description && errors.description)}
                                        mode="outlined"
                                        multiline
                                        numberOfLines={3}
                                        style={styles.input}
                                    />

                                    {/* Ingredients Section */}
                                    <FieldArray
                                        name="ingredients"
                                        render={arrayHelpers => (
                                            <View>
                                                <Text style={styles.sectionTitle}>Ingredients</Text>
                                                {values.ingredients?.map((ingredient, index) => (
                                                    <View key={index} style={styles.form}>
                                                        {/* Remove ingredient icon */}
                                                        <IconButton
                                                            icon="minus-circle-outline"
                                                            onPress={() => arrayHelpers.remove(index)}
                                                            disabled={index === 0}
                                                        />

                                                        {/* Name input */}
                                                        <TextInput
                                                            ref={(ref: any) => (nameRefs.current[index] = ref)}
                                                            label="Name"
                                                            value={ingredient?.name || ''}
                                                            onChangeText={handleChange(`ingredients[${index}].name`)}
                                                            onBlur={() => {
                                                                handleBlur(`ingredients[${index}].name`)
                                                                quantityRefs.current[index].focus()
                                                            }}
                                                            error={
                                                                touched.ingredients?.[index]?.name &&
                                                                typeof errors.ingredients?.[index] === 'object' &&
                                                                (errors.ingredients?.[index] as any)?.name
                                                            }
                                                            mode="outlined"
                                                            style={styles.formInput}
                                                        />

                                                        {/* Quantity input */}
                                                        <TextInput
                                                            ref={(ref: any) => (quantityRefs.current[index] = ref)}
                                                            label="Quantity"
                                                            value={ingredient?.quantity?.toString() || ''}
                                                            onChangeText={handleChange(`ingredients.${index}.quantity`)}
                                                            onBlur={handleBlur(`ingredients.${index}.quantity`)}
                                                            error={
                                                                touched.ingredients?.[index]?.quantity &&
                                                                typeof errors.ingredients?.[index] === 'object' &&
                                                                (errors.ingredients?.[index] as any)?.quantity
                                                            }
                                                            mode="outlined"
                                                            style={styles.quantityInput}
                                                            keyboardType="numeric"
                                                        />

                                                        {/* Unit dropdown */}
                                                        <View style={styles.unitInput}>
                                                            <Dropdown
                                                                label="Unit"
                                                                value={values.ingredients[index].unit}
                                                                options={[
                                                                    {
                                                                        label: 'g',
                                                                        value: Unit.g,
                                                                    },
                                                                    {
                                                                        label: 'cl',
                                                                        value: Unit.cl,
                                                                    },
                                                                    {
                                                                        label: 'p',
                                                                        value: Unit.p,
                                                                    },
                                                                ]}
                                                                onSelect={unit =>
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

                                                {/* Add ingredient icon */}
                                                <IconButton
                                                    icon="plus-circle-outline"
                                                    size={30}
                                                    onPress={() =>
                                                        arrayHelpers.push({
                                                            name: '',
                                                            quantity: '',
                                                            unit: Unit.g,
                                                        })
                                                    }
                                                    style={styles.addIcon}
                                                />
                                            </View>
                                        )}
                                    />
                                </ScrollView>
                                <View style={styles.footer}>
                                    <TouchableRipple
                                        onPress={() => handleSubmit()}
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
                        )
                    }}
                </Formik>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -15,
    },
    imageContainer: {
        marginBottom: 24,
        marginTop: 40,
        elevation: 8,
        borderRadius: 30,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    formInput: {
        flex: 2,
        marginRight: 5,
        fontSize: 12,
    },
    quantityInput: {
        flex: 1,
        marginRight: 5,
        fontSize: 12,
    },
    unitInput: {
        flex: 0.8,
    },
    addIcon: {
        alignSelf: 'center',
        marginTop: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#CCC',
        backgroundColor: colors.onPrimary,
        elevation: 5,
    },
    addButton: {
        borderRadius: 30,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: 'uppercase',
    },
})
