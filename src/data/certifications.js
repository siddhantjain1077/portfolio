// Add your real certifications here. Each card falls back to a placeholder
// state until you fill in `earned: true` and the corresponding fields.
export const categories = ['All', 'Cloud', 'AI/ML', 'Development', 'Other']

export const certifications = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  earned: false,
  name: `Certificate Slot ${i + 1}`,
  issuer: 'Add issuing organization',
  date: '—',
  credentialId: '—',
  category: categories[(i % (categories.length - 1)) + 1],
  image: null,
  verifyUrl: '#',
}))
