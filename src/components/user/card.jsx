// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";

// const itemVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0 },
// };

// const CardItem = ({
//   image,
//   title,
//   description,
//   onButtonClick,
//   rating,
//   layout = "vertical",
//   linkTo = "#",
// }) => {
//   const isHorizontal = layout === "horizontal";
//   const validRating = Math.max(0, Math.min(5, Number(rating) || 0));

//   return (
//     <motion.div
//       variants={itemVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: false, amount: 0.2 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`card ${
//         isHorizontal ? "card-side" : ""
//       } bg-white border-2 border-gray-200 shadow-md overflow-hidden max-w-sm mx-auto rounded-lg`}
//     >
//       <figure className="relative overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className={`transition-transform duration-300 ease-in-out ${
//             isHorizontal ? "w-48 h-full" : "h-56 w-full"
//           } object-cover hover:scale-110`}
//         />
//         {rating && (
//           <div className="absolute top-2 right-2 bg-white text-sm font-semibold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
//             <span className="text-warm-orange">
//               <FaStar />
//             </span>
//             <span>{Number(validRating).toFixed(1)}</span>
//           </div>
//         )}
//       </figure>

//       <div className="p-4 sm:p-6">
//         <h3 className="text-lg font-medium text-gray-900">{title}</h3>

//         <p className="mt-2 line-clamp-2 text-sm text-gray-500">{description}</p>

//         <Link
//           to={linkTo}
//           onClick={onButtonClick}
//           className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal"
//         >
//           Lihat Detail
//           <span
//             aria-hidden="true"
//             className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
//           >
//             &rarr;
//           </span>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// const CardGrid = ({ cards, layout = "vertical" }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
//       {cards.map((card, index) => (
//         <CardItem
//           key={index}
//           image={card.image}
//           title={card.title}
//           description={card.description}
//           buttonText={card.buttonText}
//           onButtonClick={card.onButtonClick}
//           rating={card.rating}
//           layout={layout}
//           price={card.price}
//           linkTo={card.linkTo}
//         />
//       ))}
//     </div>
//   );
// };

// export { CardItem, CardGrid };
