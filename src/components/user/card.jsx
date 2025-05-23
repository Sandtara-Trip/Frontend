import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const CardItem = ({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
  rating,
  layout = "vertical",
  price,
}) => {
  const isHorizontal = layout === "horizontal";
  const validRating = Math.max(0, Math.min(5, Number(rating) || 0)); // pastikan 0–5

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`card ${isHorizontal ? "card-side" : ""} bg-base-100 shadow-lg overflow-hidden max-w-sm mx-auto`}
    >
      <figure className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`transition-transform duration-300 ease-in-out ${
            isHorizontal ? "w-48 h-full" : "h-48 w-full"
          } object-cover hover:scale-110`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {price && (
          <p className="text-lg font-semibold text-warm-orange">{price}</p>
        )}
        <p className="line-clamp-2">{description}</p>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${title}`}
              className="mask mask-star-2 bg-warm-orange"
              aria-label={`${index + 1} star`}
              checked={index < validRating}
              readOnly
            />
          ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full mt-2" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CardGrid = ({ cards, layout = "vertical" }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {cards.map((card, index) => (
        <CardItem
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          onButtonClick={card.onButtonClick}
          rating={card.rating}
          layout={layout}
          price={card.price}
        />
      ))}
    </div>
  );
};

export { CardItem, CardGrid };
