/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Utility functions to format credit card input fields.
 * Includes formatting for card number, CVC, and expiration date.
 * Uses the 'payment' library to detect card types and apply issuer-specific formats.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import Payment from "payment";

// Remove all non-digit characters from the input
function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

// Format the credit card number according to the card type
export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      // Format Amex as "xxxx xxxxxx xxxxx"
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      // Format Diners Club as "xxxx xxxxxx xxxx"
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      // Default format "xxxx xxxx xxxx xxxx"
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

// Format the CVC code according to the card type
export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === "amex" ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

// Format expiration date as "MM/YY"
export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}
