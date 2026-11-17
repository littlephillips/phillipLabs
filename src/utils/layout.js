// Section padding. Standalone pages (own route) start close to the header so
// the content lands inside the first screen; Home sections use the normal rhythm.
export const sectionPad = (standalone) => (standalone ? "pt-6 pb-10 lg:pt-8 lg:pb-12" : "py-section");
