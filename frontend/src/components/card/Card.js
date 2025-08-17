/*
 * eShop Project - Card Component
 * Description: A reusable Card component for wrapping content with
 * consistent styling. Accepts additional custom classes via `cardClass`
 * prop and renders any children passed inside.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import styles from "./Card.module.scss";

/**
 * Card component
 * @param {ReactNode} children - Content to render inside the card
 * @param {string} cardClass - Optional additional CSS classes
 */
const Card = ({ children, cardClass = "" }) => {
  // Combine default card styles with any additional class provided
  return (
    <div className={`${styles.card} ${cardClass}`.trim()}>
      {children}
    </div>
  );
};

export default Card;
