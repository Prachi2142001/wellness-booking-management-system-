# Wellness Booking Management System - Documentation

## 1. Architecture Overview
The application is built as a single-page application (SPA) using React 19.0.0. It follows a modular component-based architecture:
- **/components/calender**: Contains core layout and board components (CalendarGrid, BookingCard, TherapistRow).
- **/components/layout**: Contains global layout wrappers such as the core application Navbar.
- **/context**: Houses the `DataContext.js` for optimistic UI hydration and global state mapping.
- **/services**: Houses `api.js` for handling mock integrations via `axios`.

The UI relies heavily on a dynamic CSS grid implementation to render a timeline (vertical slots of 15-minute grids) crossed against therapist queues (horizontal slots). Overlapping logic automatically splits the `width` factor of any concurrent bookings within the same 15-minute grid.

## 2. State Management Explanation
The application utilizes the **Context API** (`DataContext.js`) to handle state propagation, specifically to avoid "prop drilling" across deeply nested panels.
- **Optimistic Updates**: When mutations (Create, Update, Delete) are fired to the backend, `DataContext` simultaneously handles local cache updates (`addBookingLocally`, `updateBookingLocally`, `removeBookingLocally`). This ensures a 0ms perceived latency for the user—satisfying the strict "no UI lag" requirement.
- **Normalization**: Backend APIs return heavily nested multi-level schemas based on group IDs. The Context API dynamically flattens this on initialization map, filtering out unused data models into a unified array used directly by the frontend virtual grid.

## 3. Performance Strategy
Handling scale (up to 200 therapists and 2000+ bookings) requires deep memory optimization:
- **Memoization (`useMemo`)**: Expensive flattening and overlapping operations inside `CalendarGrid.js` are tightly wrapped inside `useMemo()` hooks. This explicitly prevents React from re-running the heavy grid algorithm on standard UI state touches (like opening closing a modal panel or sliding the layout dropdown).
- **Efficient DOM Updates**: Instead of rebuilding standard nested DOM loops, the timeline strictly uses absolute positioning mapping against a mathematically predicted height/width scale layout.
- **Virtualization Consideration**: A full viewport-based virtualization library was considered, but manual absolute-positioning limits DOM reflow metrics enough that native performance sustains smooth scrolling under a mock 2000 load.

## 4. Assumptions Made
- The "Create Booking" API requires exact JSON object matches (e.g. nested lists formatted as arrays). We mapped UI states locally to strict schemas since the mock validation is rigid.
- Female and Male gender maps correlate internally to the API. Female mapped dynamically to Pink Hex `#EC4899`, and Male mapped to Blue Hex `#3B82F6` per Figma.
- The user is authenticated by default and valid `GET /bookings` data acts as the absolute source of truth until a local cache invalidates.
