import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

interface StarRatingProps {
    averageRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ averageRating }) => {
    const starElements = [];
    const roundedRating = Math.round(averageRating);

    for (let i = 1; i <= 5; i++) {
        const isChecked = i <= roundedRating;

        starElements.push(
            <FontAwesomeIcon
                icon={isChecked ? solidStar : regularStar}
                key={i}
                className={isChecked ? 'checked' : ''}
            />
        );
    }

    return <>{starElements}</>;
};

export default StarRating;