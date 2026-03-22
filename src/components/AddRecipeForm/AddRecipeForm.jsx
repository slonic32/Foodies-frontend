import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiChevronDown } from 'react-icons/fi';
import { HiOutlineCamera } from 'react-icons/hi';
import toast from 'react-hot-toast';

import { fetchCategories, fetchAreas, fetchIngredients, createRecipe } from '../../redux/recipes/operations';
import { resetCreateSuccess } from '../../redux/recipes/slice';
import {
    selectCategories,
    selectAreas,
    selectIngredients,
    selectRecipesLoading,
    selectCreateSuccess,
    selectCreatedRecipe,
} from '../../redux/recipes/selectors';

import IngredientCard from '../IngredientCard/IngredientCard';
import css from './AddRecipeForm.module.css';

const recipeValidationSchema = Yup.object({
    title: Yup.string().required('Recipe name is required'),
    description: Yup.string()
        .required('Description is required')
        .max(200, 'Description must be at most 200 characters'),
    category_id: Yup.mixed().required('Category is required'),
    area_id: Yup.mixed().required('Area is required'),
    instructions: Yup.string()
        .required('Recipe preparation instructions are required')
        .max(1000, 'Instructions must be at most 1000 characters'),
});

const initialValues = {
    title: '',
    description: '',
    category_id: '',
    area_id: '',
    instructions: '',
};

export default function AddRecipeForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const categoryRef = useRef(null);
    const areaRef = useRef(null);
    const ingredientRef = useRef(null);
    const textareaRef = useRef(null);
    const formikRef = useRef(null);

    const categories = useSelector(selectCategories);
    const areas = useSelector(selectAreas);
    const ingredientsOptions = useSelector(selectIngredients);
    const loading = useSelector(selectRecipesLoading);
    const createSuccess = useSelector(selectCreateSuccess);
    const createdRecipe = useSelector(selectCreatedRecipe);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [currentIngredientId, setCurrentIngredientId] = useState('');
    const [currentMeasure, setCurrentMeasure] = useState('');
    const [cookingTime, setCookingTime] = useState(10);
    const [imageError, setImageError] = useState('');
    const [ingredientsError, setIngredientsError] = useState('');

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [areaOpen, setAreaOpen] = useState(false);
    const [ingredientOpen, setIngredientOpen] = useState(false);

    const autoResizeTextarea = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchAreas());
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (createSuccess) {
            toast.success('Recipe published successfully!');
            const recipeId = createdRecipe?.id;
            dispatch(resetCreateSuccess());
            if (recipeId) {
                navigate(`/recipe/${recipeId}`);
            } else {
                navigate('/');
            }
        }
    }, [createSuccess, createdRecipe, dispatch, navigate]);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target)) setCategoryOpen(false);
            if (areaRef.current && !areaRef.current.contains(e.target)) setAreaOpen(false);
            if (ingredientRef.current && !ingredientRef.current.contains(e.target)) setIngredientOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setImageError('');
        }
    };

    const decrementTime = () => {
        setCookingTime((prev) => Math.max(1, prev - 10));
    };

    const incrementTime = () => setCookingTime((prev) => prev + 10);

    const handleAddIngredient = () => {
        if (!currentIngredientId) {
            setIngredientsError('Please select an ingredient');
            return;
        }
        if (!currentMeasure.trim()) {
            setIngredientsError('Please enter a quantity');
            return;
        }

        const ingredientData = ingredientsOptions.find((ing) => String(ing.id) === String(currentIngredientId));

        if (!ingredientData) return;

        if (selectedIngredients.some((i) => String(i.id) === String(currentIngredientId))) {
            setIngredientsError('This ingredient is already added');
            return;
        }

        setSelectedIngredients((prev) => [
            ...prev,
            {
                id: String(currentIngredientId),
                name: ingredientData.name,
                img: ingredientData.img,
                measure: currentMeasure.trim(),
            },
        ]);
        setCurrentIngredientId('');
        setCurrentMeasure('');
        setIngredientsError('');
        setIngredientOpen(false);
    };

    const handleRemoveIngredient = (id) => {
        setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
    };

    const handleClearForm = () => {
        if (formikRef.current) {
            formikRef.current.resetForm();
        }
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        setSelectedIngredients([]);
        setCurrentIngredientId('');
        setCurrentMeasure('');
        setCookingTime(10);
        setImageError('');
        setIngredientsError('');
    };

    const handleCategorySelect = (e, categoryId, setFieldValue) => {
        e.stopPropagation();
        setFieldValue('category_id', categoryId);
        setCategoryOpen(false);
    };

    const handleAreaSelect = (e, areaId, setFieldValue) => {
        e.stopPropagation();
        setFieldValue('area_id', areaId);
        setAreaOpen(false);
    };

    const handleIngredientSelect = (e, ingredientId) => {
        e.stopPropagation();
        setCurrentIngredientId(String(ingredientId));
        setIngredientsError('');
        setIngredientOpen(false);
    };

    const onSubmit = (values) => {
        if (!imageFile) {
            setImageError('Recipe image is required');
            return;
        }
        if (selectedIngredients.length === 0) {
            setIngredientsError('At least one ingredient is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('instructions', values.instructions);
        formData.append('thumb', imageFile);
        formData.append('time', cookingTime);
        formData.append('category_id', values.category_id);
        formData.append('area_id', values.area_id);
        formData.append(
            'ingredients',
            JSON.stringify(
                selectedIngredients.map((ing) => ({
                    id: ing.id,
                    measure: ing.measure,
                }))
            )
        );

        dispatch(createRecipe(formData))
            .unwrap()
            .catch((error) => {
                toast.error(error || 'Failed to publish recipe', { duration: 4000 });
            });
    };

    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={recipeValidationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, setFieldValue }) => {
                const selectedCategoryName =
                    categories.find((c) => String(c.id) === String(values.category_id))?.name || '';
                const selectedAreaName = areas.find((a) => String(a.id) === String(values.area_id))?.name || '';
                const selectedIngredientName =
                    ingredientsOptions.find((i) => String(i.id) === currentIngredientId)?.name || '';

                return (
                    <Form className={css.form}>
                        <div className={css.formLayout}>
                            {/* Image Upload Section */}
                            <div className={css.imageSection}>
                                <div
                                    className={imagePreview ? css.imageUploadFilled : css.imageUpload}
                                    onClick={handleImageClick}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Recipe preview" className={css.previewImage} />
                                    ) : (
                                        <div className={css.uploadPlaceholder}>
                                            <HiOutlineCamera size={40} className={css.cameraIcon} />
                                            <span className={css.uploadText}>Upload a photo</span>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={css.fileInput}
                                    />
                                </div>
                                {imagePreview && (
                                    <button type="button" className={css.changePhotoBtn} onClick={handleImageClick}>
                                        Upload another photo
                                    </button>
                                )}
                                {imageError && <p className={css.error}>{imageError}</p>}
                            </div>

                            {/* Form Fields Section */}
                            <div className={css.fieldsSection}>
                                {/* Recipe Title */}
                                <div className={css.field}>
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="THE NAME OF THE RECIPE"
                                        className={
                                            errors.title && touched.title ? css.titleInputError : css.titleInput
                                        }
                                    />
                                    <ErrorMessage name="title" component="p" className={css.error} />
                                </div>

                                {/* Description */}
                                <div className={css.field}>
                                    <div className={css.fieldWithCounter}>
                                        <Field
                                            name="description"
                                            type="text"
                                            placeholder="Enter a description of the dish"
                                            className={
                                                errors.description && touched.description
                                                    ? css.inputError
                                                    : css.inputUnderline
                                            }
                                        />
                                        <span className={css.counter}>
                                            {values.description.length}/
                                            <span className={css.counterMax}>200</span>
                                        </span>
                                    </div>
                                    <ErrorMessage name="description" component="p" className={css.error} />
                                </div>

                                {/* Category and Cooking Time Row */}
                                <div className={css.row}>
                                    {/* Category */}
                                    <div className={css.fieldHalf}>
                                        <label className={css.label}>CATEGORY</label>
                                        <div className={css.selectWrapper} ref={categoryRef}>
                                            <div
                                                className={
                                                    errors.category_id && touched.category_id
                                                        ? css.selectError
                                                        : css.select
                                                }
                                                onClick={() => setCategoryOpen(!categoryOpen)}
                                            >
                                                <span
                                                    className={
                                                        selectedCategoryName
                                                            ? css.selectValue
                                                            : css.selectPlaceholder
                                                    }
                                                >
                                                    {selectedCategoryName || 'Select a category'}
                                                </span>
                                                <FiChevronDown
                                                    size={20}
                                                    className={`${css.chevron} ${categoryOpen ? css.chevronOpen : ''}`}
                                                />
                                            </div>
                                            {categoryOpen && (
                                                <ul className={css.dropdown}>
                                                    {categories.map((category) => (
                                                        <li
                                                            key={category.id}
                                                            className={css.dropdownItem}
                                                            onClick={(e) =>
                                                                handleCategorySelect(e, category.id, setFieldValue)
                                                            }
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <ErrorMessage name="category_id" component="p" className={css.error} />
                                    </div>

                                    {/* Cooking Time */}
                                    <div className={css.fieldHalf}>
                                        <label className={css.label}>COOKING TIME</label>
                                        <div className={css.timeCounter}>
                                            <button type="button" className={css.timeBtn} onClick={decrementTime}>
                                                <FiMinus size={16} />
                                            </button>
                                            <span className={css.timeValue}>{cookingTime} min</span>
                                            <button type="button" className={css.timeBtn} onClick={incrementTime}>
                                                <FiPlus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Area */}
                                <div className={css.field}>
                                    <label className={css.label}>AREA</label>
                                    <div className={css.selectWrapper} ref={areaRef}>
                                        <div
                                            className={
                                                errors.area_id && touched.area_id ? css.selectError : css.select
                                            }
                                            onClick={() => setAreaOpen(!areaOpen)}
                                        >
                                            <span
                                                className={
                                                    selectedAreaName ? css.selectValue : css.selectPlaceholder
                                                }
                                            >
                                                {selectedAreaName || 'Area'}
                                            </span>
                                            <FiChevronDown
                                                size={20}
                                                className={`${css.chevron} ${areaOpen ? css.chevronOpen : ''}`}
                                            />
                                        </div>
                                        {areaOpen && (
                                            <ul className={css.dropdown}>
                                                {areas.map((area) => (
                                                    <li
                                                        key={area.id}
                                                        className={css.dropdownItem}
                                                        onClick={(e) =>
                                                            handleAreaSelect(e, area.id, setFieldValue)
                                                        }
                                                    >
                                                        {area.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <ErrorMessage name="area_id" component="p" className={css.error} />
                                </div>

                                {/* Ingredients */}
                                <div className={css.field}>
                                    <label className={css.label}>INGREDIENTS</label>
                                    <div className={css.ingredientRow}>
                                        <div className={css.selectWrapper} ref={ingredientRef}>
                                            <div
                                                className={css.select}
                                                onClick={() => setIngredientOpen(!ingredientOpen)}
                                            >
                                                <span
                                                    className={
                                                        selectedIngredientName
                                                            ? css.selectValue
                                                            : css.selectPlaceholder
                                                    }
                                                >
                                                    {selectedIngredientName || 'Add the ingredient'}
                                                </span>
                                                <FiChevronDown
                                                    size={20}
                                                    className={`${css.chevron} ${ingredientOpen ? css.chevronOpen : ''}`}
                                                />
                                            </div>
                                            {ingredientOpen && (
                                                <ul className={css.dropdown}>
                                                    {ingredientsOptions.map((ingredient) => (
                                                        <li
                                                            key={ingredient.id}
                                                            className={css.dropdownItem}
                                                            onClick={(e) =>
                                                                handleIngredientSelect(e, ingredient.id)
                                                            }
                                                        >
                                                            {ingredient.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <input
                                            className={css.measureInput}
                                            type="text"
                                            placeholder="Enter quantity"
                                            value={currentMeasure}
                                            onChange={(e) => setCurrentMeasure(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className={css.addIngredientBtn}
                                        onClick={handleAddIngredient}
                                    >
                                        ADD INGREDIENT <FiPlus size={16} />
                                    </button>
                                    {ingredientsError && <p className={css.error}>{ingredientsError}</p>}
                                </div>

                                {/* Selected Ingredients List */}
                                {selectedIngredients.length > 0 && (
                                    <div className={css.ingredientsList}>
                                        {selectedIngredients.map((ingredient) => (
                                            <IngredientCard
                                                key={ingredient.id}
                                                ingredient={ingredient}
                                                onRemove={handleRemoveIngredient}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Recipe Preparation */}
                                <div className={css.field}>
                                    <label className={css.label}>RECIPE PREPARATION</label>
                                    <div className={css.fieldWithCounter}>
                                        <Field name="instructions">
                                            {({ field }) => (
                                                <textarea
                                                    {...field}
                                                    ref={textareaRef}
                                                    className={
                                                        errors.instructions && touched.instructions
                                                            ? css.textareaError
                                                            : css.textarea
                                                    }
                                                    placeholder="Enter recipe"
                                                    rows={1}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        autoResizeTextarea();
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <span className={css.counterTextarea}>
                                            {values.instructions.length}/
                                            <span className={css.counterMax}>1000</span>
                                        </span>
                                    </div>
                                    <ErrorMessage name="instructions" component="p" className={css.error} />
                                </div>

                                {/* Action Buttons */}
                                <div className={css.actions}>
                                    <button
                                        type="button"
                                        className={css.clearBtn}
                                        onClick={handleClearForm}
                                        aria-label="Clear form"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                    <button type="submit" className={css.publishBtn} disabled={loading}>
                                        {loading ? 'Publishing...' : 'PUBLISH'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}