import { useState } from 'react';
import quoteIcon from '../../assets/quote.svg';
import css from './Testimonials.module.css';

const testimonialsData = [
    {
        id: 1,
        text: 'Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!',
        author: 'LARRY PAGEIM',
    },
    {
        id: 2,
        text: 'The chocolate lava cake recipe was absolutely divine! My family couldn\'t stop raving about it. The instructions were clear and easy to follow, even for a beginner baker like me. Highly recommended!',
        author: 'SARAH JOHNSON',
    },
    {
        id: 3,
        text: 'I made the grilled salmon with lemon butter sauce last weekend and it was a huge hit at our dinner party. All my guests asked for the recipe. Your culinary guide has truly transformed my cooking skills!',
        author: 'MICHAEL CHEN',
    },
];

function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    const currentTestimonial = testimonialsData[currentSlide];

    return (
        <section className={css.section}>
            <div className={css.container}>
                <h2 className={css.subtitle}>What our customer say</h2>
                <h3 className={css.title}>TESTIMONIALS</h3>

                <div className={css.sliderWrapper}>
                    <div className={css.quoteIcon}>
                        <img src={quoteIcon} alt="Quote icon" />
                    </div>

                    <p className={css.testimonialText}>{currentTestimonial.text}</p>

                    <h4 className={css.authorName}>{currentTestimonial.author}</h4>

                    <div className={css.dotsContainer}>
                        {testimonialsData.map((_, index) => (
                            <button
                                key={index}
                                className={`${css.dot} ${
                                    index === currentSlide ? css.activeDot : ''
                                }`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
