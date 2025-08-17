/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * This file is part of the eShop application.
 *
 * Description:
 * Helmet component to dynamically set the page title
 * and provide a container with a top margin to prevent
 * content from being hidden behind the header.
 *
 * Usage:
 * <Helmet title="Page Name">
 *    ...page content...
 * </Helmet>
 *
 * License:
 * MIT License
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useEffect } from "react"; // React hook to handle side effects

// Helmet component
const Helmet = ({ title = "Home", children }) => {
  // Update the document title when the component is rendered
  useEffect(() => {
    document.title = `eShop ordering app - ${title}`; // Format: eShop ordering app - [Title]
  }, [title]); // Dependency: title

  // Returns a container with top margin to avoid header overlap
  return (
    <div style={{ marginTop: "5rem" }} className="container w-100">
      {children} {/* Page content */}
    </div>
  );
};

export default Helmet; // Export component for use in the application
