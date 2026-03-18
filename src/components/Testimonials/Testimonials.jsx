import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import quoteIcon from '../../assets/quote.svg';
import css from './Testimonials.module.css';

import { fetchTestimonials } from '../../redux/testimonials/operations';
import {
    selectTestimonials,
    selectTestimonialsError,
    selectTestimonialsLoading,
} from '../../redux/testimonials/selectors';

const AUTOPLAY_DELAY = 7000;
const FADE_DELAY = 200;

export default function Testimonials() {
    const dispatch = useDispatch();

    const testimonials = useSelector(selectTestimonials);
    const isLoading = useSelector(selectTestimonialsLoading);
    const error = useSelector(selectTestimonialsError);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const timeoutRef = useRef(null);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    useEffect(() => {
        if (testimonials.length <= 1) return;

        const intervalId = setInterval(() => {
            setIsVisible(false);

            timeoutRef.current = setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
                setIsVisible(true);
            }, FADE_DELAY);
        }, AUTOPLAY_DELAY);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutRef.current);
        };
    }, [testimonials.length]);

    const handleDotClick = (index) => {
        if (index === currentSlide) return;

        clearTimeout(timeoutRef.current);
        setIsVisible(false);

        timeoutRef.current = setTimeout(() => {
            setCurrentSlide(index);
            setIsVisible(true);
        }, FADE_DELAY);
    };

    if (isLoading && testimonials.length === 0) {
        return (
            <section className={css.section}>
                <div className={css.container}>
                    <p className={css.subtitle}>What our customer say</p>
                    <h2 className={css.title}>testimonials</h2>

                    <div className={css.loaderWrapper}>
                        <Loader />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={css.section}>
                <div className={css.container}>
                    <p className={css.subtitle}>What our customer say</p>
                    <h2 className={css.title}>testimonials</h2>
                    <p className={css.errorText}>Failed to load testimonials.</p>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) return null;

    const safeIndex = currentSlide % testimonials.length;
    const currentTestimonial = testimonials[safeIndex];
    const testimonialText = currentTestimonial.testimonial || currentTestimonial.text || '';
    const authorName = currentTestimonial.ownerName || currentTestimonial.author || 'Anonymous';

    return (
        <section className={css.section}>
            <div className={css.container}>
                <p className={css.subtitle}>What our customer say</p>
                <h2 className={css.title}>testimonials</h2>

                <div className={`${css.sliderWrapper} ${isVisible ? css.fadeIn : css.fadeOut}`}>
                    <div className={css.quoteIcon}>
                        <img src={quoteIcon} alt="" aria-hidden="true" />
                    </div>

                    <p className={css.testimonialText}>{testimonialText}</p>

                    <p className={css.authorName}>{authorName}</p>
                </div>

                {testimonials.length > 1 && (
                    <div className={css.dotsContainer}>
                        {testimonials.map((item, index) => (
                            <button
                                key={item.id ?? item._id ?? index}
                                type="button"
                                className={`${css.dot} ${index === safeIndex ? css.activeDot : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
